import Image from "next/image"
import { Search, ShieldCheck, Send, BarChart3 } from "lucide-react"

export default function ExtraServices() {
  const services = [
    {
      title: "Source from Industry Hubs",
      icon: <Search className="w-6 h-6 text-[#0d6efd]" />,
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      title: "Customize Your Products",
      icon: <ShieldCheck className="w-6 h-6 text-[#0d6efd]" />,
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      title: "Fast, reliable shipping by ocean or air",
      icon: <Send className="w-6 h-6 text-[#0d6efd]" />,
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      title: "Product monitoring and inspection",
      icon: <BarChart3 className="w-6 h-6 text-[#0d6efd]" />,
      image: "/placeholder.svg?height=120&width=200",
    },
  ]

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Our extra services</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {services.map((service, index) => (
          <div key={index} className="relative border border-[#dee2e7] rounded-md overflow-hidden">
            <Image
              src={service.image || "/placeholder.svg"}
              alt={service.title}
              width={200}
              height={120}
              className="w-full h-[120px] object-cover"
            />
            <div className="absolute top-2 right-2 bg-white p-1 rounded-full">{service.icon}</div>
            <div className="p-3">
              <h3 className="text-sm font-medium">{service.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

