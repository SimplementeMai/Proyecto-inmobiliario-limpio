import * as React from "react"
import { Input } from "@/app/components/ui/input"

interface CalendarPickerProps {
  onChange: (date: string) => void
}

export function CalendarPicker({ onChange }: CalendarPickerProps) {
  return (
    <Input 
      type="date" 
      onChange={(e) => onChange(e.target.value)} 
      className="w-full"
    />
  )
}
