import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
const badgeVariants = cva("inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium transition-colors",{
  variants: {
    variant: {
      default:   "border-transparent bg-gold text-studio-black",
      outline:   "border-gold/60 text-gold",
      secondary: "border-studio-border bg-studio-dark text-mist",
      ghost:     "border-transparent text-mist",
    },
  },
  defaultVariants: { variant: "default" },
})
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}
function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}
export { Badge, badgeVariants }
