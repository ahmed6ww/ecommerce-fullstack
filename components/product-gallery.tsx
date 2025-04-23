"use client"

import { useState } from "react"
import Image from "next/image"

interface ProductGalleryProps {
  images: string[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  // If no images provided, use a placeholder
  const galleryImages = images.length > 0 ? images : ["/placeholder.svg?height=400&width=400"]

  // Create multiple images for the gallery if only one is provided
  const displayImages = galleryImages.length === 1 ? Array(6).fill(galleryImages[0]) : galleryImages

  return (
    <div>
      <div className="border border-[#dee2e7] rounded-md p-2 mb-4">
        <Image
          src={displayImages[selectedImage] || '/placeholder.svg"}holder.svg'}
          alt="Product"
          width={400}
          height={400}
          className="w-full h-auto object-contain aspect-square"
        />
      </div>

      <div className="grid grid-cols-6 gap-2">
        {displayImages.map((image, index) => (
          <button
            key={index}
            className={`border ${selectedImage === index ? "border-[#0d6efd]" : "border-[#dee2e7]"} rounded-md p-1`}
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              width={60}
              height={60}
              className="w-full h-auto object-contain aspect-square"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

