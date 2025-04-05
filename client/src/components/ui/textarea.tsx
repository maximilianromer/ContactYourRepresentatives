import * as React from "react"
import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    
    const handleRef = (element: HTMLTextAreaElement) => {
      textareaRef.current = element
      if (typeof ref === 'function') {
        ref(element)
      } else if (ref) {
        ref.current = element
      }
    }

    // Function to adjust height based on content
    const adjustHeight = () => {
      const textarea = textareaRef.current
      if (textarea) {
        // Reset height to allow shrinking if content is deleted
        textarea.style.height = "auto"
        // Set height based on scrollHeight to fit content
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }

    // Adjust height on component mount and when value changes
    useEffect(() => {
      adjustHeight()
    }, [value])

    // Handle onChange event
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(e)
      }
      // Adjust height after content changes
      adjustHeight()
    }

    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none overflow-hidden",
          className
        )}
        ref={handleRef}
        value={value}
        onChange={handleChange}
        rows={2} // Default to 2 rows
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
