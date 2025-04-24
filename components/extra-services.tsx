import Image from "next/image"
import { Search, ShieldCheck, Send, BarChart3 } from "lucide-react"

export default function ExtraServices() {
  const services = [
    {
      title: "Source from Industry Hubs",
      icon: <Search className="w-6 h-6 text-[#0d6efd]" />,
      image: "/servcies/image 104 (1).png",
    },
    {
      title: "Customize Your Products",
      icon: <ShieldCheck className="w-6 h-6 text-[#0d6efd]" />,
      image: "/servcies/image 106 (1).png",
    },
    {
      title: "Fast, reliable shipping by ocean or air",
      icon: <Send className="w-6 h-6 text-[#0d6efd]" />,
      image: "/servcies/image 107 (1).png",
    },
    {
      title: "Product monitoring and inspection",
      icon: <BarChart3 className="w-6 h-6 text-[#0d6efd]" />,
      image: "/servcies/image 108 (1).jpg",
    },
  ]

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Our extra services</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-4">
        {services.map((service, index) => (
          <div key={index} className="relative border border-[#dee2e7] rounded-md overflow-hidden">
            <Image
              src={service.image || "/placeholder.svg"}
              alt={service.title}
              width={200}
              height={120}
              className="w-full bg-black  h-[120px] object-cover"
            />
            <div className="absolute top-2 right-2  bg-white p-1 rounded-full">{service.icon}</div>
            <div className="p-3">
              <h3 className="text-sm font-medium">{service.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

