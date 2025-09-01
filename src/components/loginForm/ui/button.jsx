import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/components/lib/utils/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-base font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-purple-500/20 focus-visible:ring-4 transform hover:scale-105",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white shadow-lg hover:shadow-xl hover:from-purple-700 hover:via-pink-600 hover:to-orange-500",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:from-red-600 hover:to-red-700",
        outline:
          "border-2 border-gray-200 bg-white shadow-sm hover:bg-gray-50 hover:border-gray-300 text-gray-700",
        secondary:
          "bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 shadow-lg",
        ghost:
          "hover:bg-white/10 hover:text-white text-white/80",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-3 has-[>svg]:px-5",
        sm: "h-10 rounded-xl gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-14 rounded-2xl px-8 has-[>svg]:px-6",
        icon: "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
