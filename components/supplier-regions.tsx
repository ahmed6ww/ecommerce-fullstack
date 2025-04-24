import Image from "next/image"
import Link from "next/link"

export default function SupplierRegions() {
  const regions = [
    { name: "Arabic Emirates", code: "ae", suppliers: "shopname.ae" },
    { name: "Australia", code: "au", suppliers: "shopname.ae" },
    { name: "United States", code: "us", suppliers: "shopname.ae" },
    { name: "Russia", code: "ru", suppliers: "shopname.ru" },
    { name: "Italy", code: "it", suppliers: "shopname.it" },
    { name: "Denmark", code: "dk", suppliers: "denmark.com.dk" },
    { name: "France", code: "fr", suppliers: "shopname.com.fr" },
    { name: "China", code: "cn", suppliers: "shopname.ae" },
    { name: "Great Britain", code: "gb", suppliers: "shopname.co.uk" },
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
              src={`https://flagcdn.com/${region.code}.svg`}
              alt={`${region.name} flag`}
              width={30}
              height={20}
              className="rounded-sm object-cover"
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

