import { useRef } from "react"
import * as RadioGroup from '@radix-ui/react-radio-group'
import { ImagePlus, FileArchive, FileVideo } from 'lucide-react'
import { Input } from "../../../components/Input"
import { ArrowRight } from 'lucide-react'
import { Button } from "../../../components/Button"
import { z } from 'zod'
import { SubmitHandler } from "react-hook-form"
import { useZodFormReturn } from "../../../hooks/useZodForm"
import { CreateProduct } from "../../../types"
import { basicInfoSchema } from "../../../hooks/useMultiForm"

type Props = {
  form: useZodFormReturn<typeof basicInfoSchema>,
  defaultValues: z.infer<typeof basicInfoSchema>
  nextStep: (step: number) => void
  updateProduct: (product: Partial<CreateProduct>) => void
}

export function BasicInfo(props: Props) {
  const { defaultValues, nextStep: unlockStep, updateProduct, form } = props 
  const { register, formState, handleSubmit, setValue } = form
  const imageInputRef = useRef<HTMLInputElement>(null)

  function onFilePick(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (files?.length) {
      const file = files[0]
      console.log('TODO: save this file to s3:', file)
    }
  }

  const onSubmit: SubmitHandler<z.infer<typeof basicInfoSchema>> = (data) => {
    updateProduct(data)
    unlockStep(2)
  }

  return (
    <form id="createProduct-1" onSubmit={handleSubmit(onSubmit)} className="p-4 flex-1 flex flex-col justify-between gap-6">
      <Input 
        label="Name" 
        autoComplete="off"
        placeholder="Enter product name"
        type="text"
        error={formState.errors.name?.message}
        {...register('name')}
      />

      <Input 
        label="Description" 
        autoComplete="off"
        placeholder="Enter product description"
        type="text"
        error={formState.errors.description?.message}
        {...register('description')}
      />

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
        <RadioGroup.Root defaultValue={defaultValues.type} className="flex flex-col gap-6" onValueChange={value => setValue('type', value as any)}>
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

        <Button className="inline-flex self-end mt-8">
          <span>Next</span>
          <ArrowRight strokeWidth={1.5} />
        </Button>
      </div>
    </form>
  )
}
