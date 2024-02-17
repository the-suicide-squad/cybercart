import { createLazyFileRoute } from '@tanstack/react-router';
import { Steps } from '../pages/create-product/components/Steps';
import { BasicInfo } from '../pages/create-product/components/BasicInfo';
import { useState } from 'react';
import { Complete } from '../pages/create-product/components/Complete';
import { AboutPricing } from '../pages/create-product/components/AboutPricing';

export const Route = createLazyFileRoute('/create')({
  component: CreateProductPage,
})

function CreateProductPage() {
  // 1 -> basic info, 2 -> about, 3 -> complete
  const [step, setStep] = useState<number>(1)

  return (
    <div className="px-8 my-3 p-4 flex-1 flex flex-col">
      <h1 className="font-semibold text-2xl mb-5">Create Product</h1>
      <div className="border border-border flex-1 flex rounded-lg">
        <Steps step={step} setStep={setStep} />
        {step === 1 && <BasicInfo />}
        {step === 2 && <AboutPricing />}
        {step === 3 && <Complete />}
      </div>
    </div>
  )
}
