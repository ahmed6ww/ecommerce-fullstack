import Image from "next/image"
import Link from "next/link"

export default function SupplierRegions() {
  const regions = [
    { name: "Arabic Emirates", flag: "/placeholder.svg?height=20&width=30", suppliers: "shopname.ae" },
    { name: "Australia", flag: "/placeholder.svg?height=20&width=30", suppliers: "shopname.ae" },
    { name: "United States", flag: "/placeholder.svg?height=20&width=30", suppliers: "shopname.ae" },
    { name: "Russia", flag: "/placeholder.svg?height=20&width=30", suppliers: "shopname.ru" },
    { name: "Italy", flag: "/placeholder.svg?height=20&width=30", suppliers: "shopname.it" },
    { name: "Denmark", flag: "/placeholder.svg?height=20&width=30", suppliers: "denmark.com.dk" },
    { name: "France", flag: "/placeholder.svg?height=20&width=30", suppliers: "shopname.com.fr" },
    { name: "Arabic Emirates", flag: "/placeholder.svg?height=20&width=30", suppliers: "shopname.ae" },
    { name: "China", flag: "/placeholder.svg?height=20&width=30", suppliers: "shopname.ae" },
    { name: "Great Britain", flag: "/placeholder.svg?height=20&width=30", suppliers: "shopname.co.uk" },
  ]

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Suppliers by region</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {regions.map((region, index) => (
          <Link
            href="#"
            key={index}
            className="flex items-center gap-2 border border-[#dee2e7] rounded-md p-3 hover:border-[#0d6efd] transition-colors"
          >
            <Image
              src={region.flag || "/placeholder.svg"}
              alt={region.name}
              width={30}
              height={20}
              className="rounded-sm"
            />
            <div>
              <p className="text-sm font-medium">{region.name}</p>
              <p className="text-xs text-[#8b96a5]">{region.suppliers}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

