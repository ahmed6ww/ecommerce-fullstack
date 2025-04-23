"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"

export default function FilterSidebar() {
  const [openSections, setOpenSections] = useState({
    category: true,
    brands: true,
    features: true,
    priceRange: true,
    condition: true,
    ratings: true,
    manufacturer: true,
  })
  
  // Add state to track checked status of checkboxes
  const [checkedItems, setCheckedItems] = useState({
    samsung: true,
    apple: true,
    huawei: false,
    pocco: true,
    lenovo: false,
    metallic: true,
    'plastic-cover': false,
    '8gb-ram': false,
    'super-power': false,
    'large-memory': false,
  })

  type SectionKey = keyof typeof openSections;

  const toggleSection = (section: SectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }
  
  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedItems({
      ...checkedItems,
      [e.target.id]: e.target.checked
    })
  }

  return (
    <aside className="w-full md:w-60 shrink-0">
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer mb-3"
          onClick={() => toggleSection("category")}
        >
          <h3 className="font-semibold">Category</h3>
          {openSections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {openSections.category && (
          <div className="space-y-2">
            <div className="text-sm">
              <a href="#" className="text-blue-500">
                Mobile accessory
              </a>
            </div>
            <div className="text-sm">
              <a href="#" className="text-gray-600">
                Electronics
              </a>
            </div>
            <div className="text-sm">
              <a href="#" className="text-gray-600">
                Smartphones
              </a>
            </div>
            <div className="text-sm">
              <a href="#" className="text-gray-600">
                Modern tech
              </a>
            </div>
            <div className="text-sm">
              <a href="#" className="text-blue-500">
                See all
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between cursor-pointer mb-3" onClick={() => toggleSection("brands")}>
          <h3 className="font-semibold">Brands</h3>
          {openSections.brands ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {openSections.brands && (
          <div className="space-y-2">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="samsung" 
                className="mr-2" 
                checked={checkedItems.samsung} 
                onChange={handleCheckboxChange} 
              />
              <label htmlFor="samsung" className="text-sm">
                Samsung
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="apple" 
                className="mr-2" 
                checked={checkedItems.apple} 
                onChange={handleCheckboxChange} 
              />
              <label htmlFor="apple" className="text-sm">
                Apple
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="huawei" 
                className="mr-2" 
                checked={checkedItems.huawei} 
                onChange={handleCheckboxChange} 
              />
              <label htmlFor="huawei" className="text-sm">
                Huawei
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="pocco" 
                className="mr-2" 
                checked={checkedItems.pocco} 
                onChange={handleCheckboxChange} 
              />
              <label htmlFor="pocco" className="text-sm">
                Pocco
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="lenovo" 
                className="mr-2" 
                checked={checkedItems.lenovo} 
                onChange={handleCheckboxChange} 
              />
              <label htmlFor="lenovo" className="text-sm">
                Lenovo
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="text-blue-500">
                See all
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer mb-3"
          onClick={() => toggleSection("features")}
        >
          <h3 className="font-semibold">Features</h3>
          {openSections.features ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {openSections.features && (
          <div className="space-y-2">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="metallic" 
                className="mr-2" 
                checked={checkedItems.metallic} 
                onChange={handleCheckboxChange} 
              />
              <label htmlFor="metallic" className="text-sm">
                Metallic
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="plastic-cover" 
                className="mr-2" 
                checked={checkedItems['plastic-cover']} 
                onChange={handleCheckboxChange} 
              />
              <label htmlFor="plastic-cover" className="text-sm">
                Plastic cover
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="8gb-ram" 
                className="mr-2" 
                checked={checkedItems['8gb-ram']} 
                onChange={handleCheckboxChange} 
              />
              <label htmlFor="8gb-ram" className="text-sm">
                8GB Ram
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="super-power" 
                className="mr-2" 
                checked={checkedItems['super-power']} 
                onChange={handleCheckboxChange} 
              />
              <label htmlFor="super-power" className="text-sm">
                Super power
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="large-memory" 
                className="mr-2" 
                checked={checkedItems['large-memory']} 
                onChange={handleCheckboxChange} 
              />
              <label htmlFor="large-memory" className="text-sm">
                Large Memory
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="text-blue-500">
                See all
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer mb-3"
          onClick={() => toggleSection("priceRange")}
        >
          <h3 className="font-semibold">Price range</h3>
          {openSections.priceRange ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer mb-3"
          onClick={() => toggleSection("condition")}
        >
          <h3 className="font-semibold">Condition</h3>
          {openSections.condition ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between cursor-pointer mb-3" onClick={() => toggleSection("ratings")}>
          <h3 className="font-semibold">Ratings</h3>
          {openSections.ratings ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer mb-3"
          onClick={() => toggleSection("manufacturer")}
        >
          <h3 className="font-semibold">Manufacturer</h3>
          {openSections.manufacturer ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>
    </aside>
  )
}