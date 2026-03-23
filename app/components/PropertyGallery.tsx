import * as React from "react"
import { AspectRatio } from "@/app/components/ui/aspect-ratio"

export function PropertyGallery({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {images.map((src, index) => (
        <div key={index} className={index === 0 ? "col-span-2" : ""}>
          <AspectRatio ratio={index === 0 ? 16 / 9 : 4 / 3}>
            <img
              src={src}
              alt={`Property image ${index + 1}`}
              className="h-full w-full object-cover rounded-xl"
            />
          </AspectRatio>
        </div>
      ))}
    </div>
  )
}
