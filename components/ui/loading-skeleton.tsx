import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const skeletonVariants = cva(
  "animate-pulse rounded-md bg-muted",
  {
    variants: {
      variant: {
        default: "bg-muted",
        primary: "bg-primary/10",
        secondary: "bg-secondary",
      },
      size: {
        sm: "h-3",
        md: "h-4",
        lg: "h-6",
        xl: "h-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface LoadingSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

function LoadingSkeleton({ className, variant, size, ...props }: LoadingSkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

// Predefined skeleton components for common use cases
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <LoadingSkeleton className="h-4 w-3/4" />
      <LoadingSkeleton className="h-3 w-1/2" />
      <LoadingSkeleton className="h-3 w-2/3" />
    </div>
  )
}

export function OrderCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4 p-4 border rounded-lg", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <LoadingSkeleton className="h-4 w-24" />
          <LoadingSkeleton className="h-3 w-32" />
        </div>
        <LoadingSkeleton className="h-4 w-16" />
      </div>
      <div className="flex items-center justify-between">
        <LoadingSkeleton className="h-3 w-20" />
        <LoadingSkeleton className="h-4 w-16" />
      </div>
    </div>
  )
}

export function OrderDetailsSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="space-y-4">
        <LoadingSkeleton className="h-8 w-48" />
        <LoadingSkeleton className="h-4 w-32" />
      </div>
      
      {/* Items */}
      <div className="space-y-4">
        <LoadingSkeleton className="h-6 w-32" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
            <LoadingSkeleton className="h-12 w-12 rounded-md" />
            <div className="flex-1 space-y-2">
              <LoadingSkeleton className="h-4 w-24" />
              <LoadingSkeleton className="h-3 w-16" />
              <div className="flex justify-between">
                <LoadingSkeleton className="h-3 w-20" />
                <LoadingSkeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Timeline */}
      <div className="space-y-4">
        <LoadingSkeleton className="h-6 w-24" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <LoadingSkeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <LoadingSkeleton className="h-4 w-32" />
              <LoadingSkeleton className="h-3 w-48" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { LoadingSkeleton, skeletonVariants }
