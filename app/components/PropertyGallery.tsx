"use client"

import * as React from "react"
import { AspectRatio } from "@/app/components/ui/aspect-ratio"
import { Dialog, DialogContent, DialogTrigger } from "@/app/components/ui/dialog"

const fallbackSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23f3f4f6' width='800' height='600'/%3E%3Ctext x='400' y='300' text-anchor='middle' fill='%239ca3af' font-size='20'%3EImagen no disponible%3C/text%3E%3C/svg%3E"

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
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackSrc
                  }}
                />
              </AspectRatio>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-full p-0 border-none bg-transparent">
            <img
              src={src}
              alt={`Property image ${index + 1} expanded`}
              className="w-full h-auto rounded-xl shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = fallbackSrc
              }}
            />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}
