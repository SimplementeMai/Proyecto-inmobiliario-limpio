"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { CalendarPicker } from "./CalendarPicker"

const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  date: z.string().min(1, "Date is required"),
})

export function VisitBookingForm({ propertyId }: { propertyId: string }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(bookingSchema),
  })

  return (
    <form className="space-y-4" onSubmit={handleSubmit((data) => console.log("Booking for", propertyId, data))}>
      <div>
        <Input placeholder="Your Name" {...register("name")} />
        {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message as string}</p>}
      </div>
      <div>
        <CalendarPicker onChange={(date) => setValue("date", date)} />
        {errors.date && <p className="text-destructive text-sm mt-1">{errors.date.message as string}</p>}
      </div>
      <Button type="submit" className="w-full">Book Visit</Button>
    </form>
  )
}
