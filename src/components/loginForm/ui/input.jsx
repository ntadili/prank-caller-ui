import * as React from "react"

import { cn } from "@/components/lib/utils/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full px-4 py-4 rounded-2xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm text-gray-800 text-lg transition-all duration-300 outline-none placeholder:text-gray-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus:border-purple-500 focus:bg-white/70 focus:shadow-lg focus:shadow-purple-500/20",
        "hover:border-gray-300 hover:bg-white/60",
        className
      )}
      {...props} />
  );
}

export { Input }
