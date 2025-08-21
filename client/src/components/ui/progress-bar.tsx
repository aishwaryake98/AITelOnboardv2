import { cn } from "@/lib/utils";

interface Step {
  step: number;
  label: string;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export default function ProgressBar({ steps, currentStep, className }: ProgressBarProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {steps.map((step, index) => (
        <div key={step.step} className="flex items-center">
          <div className="flex items-center space-x-2">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                currentStep >= step.step
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-500"
              )}
            >
              {step.step}
            </div>
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                currentStep >= step.step ? "text-primary" : "text-gray-500"
              )}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-1 mx-4 rounded transition-colors",
                currentStep > step.step ? "bg-primary" : "bg-gray-200"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
