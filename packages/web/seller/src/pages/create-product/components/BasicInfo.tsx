import { useRef } from "react"
import * as RadioGroup from '@radix-ui/react-radio-group'
import { ImagePlus, FileArchive, FileVideo } from 'lucide-react'

export function BasicInfo() {
  const imageInputRef = useRef<HTMLInputElement>(null)

  function onFilePick(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (files?.length) {
      const file = files[0]
      console.log('TODO: save this file to s3:', file)
    }
  }

  return (
    <form className="p-4 flex-1 flex flex-col justify-between gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" autoComplete="off" className="bg-bg border border-border py-1.5 px-2 rounded-lg" placeholder="Enter product name" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="desc">Description</label>
        <input type="text" id="desc" autoComplete="off" className="bg-bg border border-border py-1.5 px-2 rounded-lg" placeholder="Enter product description" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="image">Image</label>
        <button type="button" onClick={() => {
          if(imageInputRef.current) {
            imageInputRef.current.click()
          }
        }} className="h-24 w-24 border border-border border-dashed rounded-lg flex items-center justify-center">
          <ImagePlus stroke="#848D97D9" strokeWidth={1.5} size={28} />
        </button>
        <input ref={imageInputRef} onChange={onFilePick} id="image" type="file" accept="image/*" className="hidden" />
      </div>

      <div className="flex flex-col gap-3">
        <p>Type</p>
        <RadioGroup.Root defaultValue="files" className="flex flex-col gap-6">
          <div className="flex gap-3 items-start">
            <RadioGroup.Item className="h-5 w-5 border border-border rounded-full flex items-center justify-center" value="files" id="files">
              <RadioGroup.Indicator className="bg-brand block h-2.5 w-2.5 rounded-full" />
            </RadioGroup.Item>
            <label htmlFor="files" className="flex gap-2 items-start">
              <FileArchive stroke="#848D97D9" strokeWidth={1.5} />
              <span className="flex flex-col">
                <span>Files</span>
                <span className="text-sm text-dim">You need to upload your product in zip file</span>
              </span>
            </label>
          </div>
          <div className="flex gap-3 items-start">
            <RadioGroup.Item className="h-5 w-5 border border-border rounded-full flex items-center justify-center" value="videos" id="videos">
              <RadioGroup.Indicator className="bg-brand block h-2.5 w-2.5 rounded-full" />
            </RadioGroup.Item>
            <label htmlFor="videos" className="flex gap-2 items-startl">
              <FileVideo stroke="#848D97D9" strokeWidth={1.5} />
              <span className="flex flex-col">
                <span>Videos</span>
                <span className="text-sm text-dim">You need to upload your videos and wait for the processing</span>
              </span>
            </label>
          </div>
        </RadioGroup.Root>
      </div>
    </form>
  )
}
