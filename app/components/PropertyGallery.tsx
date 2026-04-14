"use client"

import * as React from "react"
import { AspectRatio } from "@/app/components/ui/aspect-ratio"
import { Dialog, DialogContent, DialogTrigger } from "@/app/components/ui/dialog"

export function PropertyGallery({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {images.map((src, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <div className={index === 0 ? "col-span-2 cursor-pointer" : "cursor-pointer"}>
              <AspectRatio ratio={index === 0 ? 16 / 9 : 4 / 3}>
                <img
                  src={src}
                  alt={`Property image ${index + 1}`}
                  className="h-full w-full object-cover rounded-xl hover:opacity-90 transition-opacity"
                />
              </AspectRatio>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-full p-0 border-none bg-transparent">
            <img
              src={src}
              alt={`Property image ${index + 1} expanded`}
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}
