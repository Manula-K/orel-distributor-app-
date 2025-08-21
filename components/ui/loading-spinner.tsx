import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const loadingSpinnerVariants = cva(
  "animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
  {
    variants: {
      size: {
        sm: "h-4 w-4 border-2",
        md: "h-6 w-6 border-2",
        lg: "h-8 w-8 border-3",
        xl: "h-12 w-12 border-4",
      },
      variant: {
        default: "text-primary",
        secondary: "text-muted-foreground",
        white: "text-white",
        destructive: "text-destructive",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
)

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingSpinnerVariants> {}

function LoadingSpinner({ className, size, variant, ...props }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(loadingSpinnerVariants({ size, variant }), className)}
      role="status"
      aria-label="Loading"
      {...props}
    />
  )
}

export { LoadingSpinner, loadingSpinnerVariants }
