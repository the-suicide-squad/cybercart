export async function asyncRetryQueue<T>(
  tasks: (() => Promise<T>)[],
  limit: number,
  retry: number
): Promise<(PromiseFulfilledResult<T> | PromiseRejectedResult)[]> {
  const results: (PromiseFulfilledResult<T> | PromiseRejectedResult)[] = [];

  const runTask = async (task: () => Promise<T>, index: number) => {
    for (let i = 0; i < retry; i++) {
      try {
        const value = await task();
        results[index] = { status: "fulfilled", value };
        break;
      } catch (reason) {
        results[index] = { status: "rejected", reason };
        //other request which are running will throw "Request Aborted" message error
        //which can retrigger the the upload so break the loop when "Request Aborted" error
        if (reason instanceof Error) {
          if (reason.message === "Request Aborted") {
            break;
          }
        }
      }
    }
    if (results[index]?.status === "rejected") {
      throw new Error("Can't upload the file");
    }
  };

  const runningTasks: Promise<void>[] = [];
  for (let i = 0; i < Math.min(limit, tasks.length); i++) {
    const task = tasks[i];
    if (task) {
      runningTasks.push(runTask(task, i));
    }
  }

  let nextTaskIndex = limit;

  while (runningTasks.length > 0) {
    const completedTaskIndex = await Promise.race(
      runningTasks.map((t, idx) => t.then(() => idx))
    );
    runningTasks.splice(completedTaskIndex, 1);
    const task = tasks[nextTaskIndex];

    if (nextTaskIndex < tasks.length && task) {
      runningTasks.push(runTask(task, nextTaskIndex));
      nextTaskIndex++;
    }
  }

  return results;
}
