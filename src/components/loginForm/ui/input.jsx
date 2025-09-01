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
        "file:text-gray-800 placeholder:text-gray-400 selection:bg-purple-500 selection:text-white border-gray-200 flex h-12 w-full min-w-0 rounded-2xl border-2 bg-white px-4 py-3 text-lg shadow-sm transition-all duration-300 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus:border-purple-500 focus:ring-purple-500/20 focus:ring-4",
        "aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
        className
      )}
      {...props} />
  );
}

export { Input }
