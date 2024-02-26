import { createLazyFileRoute } from '@tanstack/react-router';
import { Steps } from '../pages/create-product/components/Steps';
import { BasicInfo } from '../pages/create-product/components/BasicInfo';
import { useState } from 'react';
import { Complete } from '../pages/create-product/components/Complete';
import { AboutPricing } from '../pages/create-product/components/AboutPricing';
import { CreateProduct } from '../types'
import { useMultiForm } from '../hooks/useMultiForm';

export const Route = createLazyFileRoute('/create')({
  component: CreateProductPage,
})

function CreateProductPage() {
  const { state: step, moveToStep, nextStep } = useMultiForm()
  const [product, setProduct] = useState<CreateProduct>({
    name: "",
    description: "",
    image: "",
    type: "files",
    about: "",
    price: 400,
  })

  function updateProduct(product: Partial<CreateProduct>) {
    setProduct(prev => ({
      ...prev, ...product
    }))
  }

  return (
    <div className="px-8 my-3 p-4 flex-1 flex flex-col">
      <h1 className="font-semibold text-2xl mb-5">Create Product</h1>
      <div className="border border-border flex-1 flex rounded-lg">
        <Steps step={step} moveToStep={moveToStep} />
        {step.current === 0 && <BasicInfo
          nextStep={nextStep}
          updateProduct={updateProduct}
          form={step.steps[0].form as any}
          defaultValues={{
            name: product.name,
            description: product.name,
            image: product.image,
            type: product.type as any,
          }} />}
        {step.current === 1 && <AboutPricing  form={step.steps[0].form as any}  updateProduct={updateProduct} nextStep={nextStep} />}
        {step.current === 2 && <Complete product={product} />}
      </div>
    </div>
  )
}
