//this folder there is no clean up because i am too lazy for cleaning up demo
import { useEffect, useRef, useState } from "react";
import { Uploader } from "./script";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<{ total: number; send: number }>({
    total: 0,
    send: 0,
  });
  const abortRef = useRef<HTMLButtonElement>(null);
  const reUploadRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (file) {
      const uploader = new Uploader({
        courseId: "12344",
        file: file,
        fileId: "1234",
      })
        .onError(console.log)
        .onProgress(({ send, total }) => {
          setProgress({ send, total });
        });
      uploader.start();

      abortRef.current?.addEventListener("click", (e) => {
        setProgress((val) => ({ ...val, send: 0 }));
        uploader.abort();
      });
      reUploadRef.current?.addEventListener("click", (e) => {
        uploader.reUpload();
      });
    }
  }, [file]);
  return (
    <>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files![0] as File);
        }}
      />
      {file && (
        <div>
          <button className="bg-green-300 p-2" ref={reUploadRef}>
            reupload
          </button>
          <button className="bg-red-300 p-2" ref={abortRef}>
            abort
          </button>
          <div>
            <span>
              {progress.send}/{progress.total}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
