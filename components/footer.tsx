import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-[#dee2e7] bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-1.5 mb-4">
              <div className="bg-[#0d6efd] text-white font-bold w-8 h-8 flex items-center justify-center rounded">
                A
              </div>
              <span className="text-[#0d6efd] font-medium">Brand</span>
            </Link>

            <p className="text-sm text-[#8b96a5] mb-4">
              Best information about the company goes here but now lorem ipsum is
            </p>

            <div className="flex gap-2">
              <Link href="#" className="text-[#8b96a5] hover:text-[#0d6efd]">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-[#8b96a5] hover:text-[#0d6efd]">
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-[#8b96a5] hover:text-[#0d6efd]">
                <Linkedin className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-[#8b96a5] hover:text-[#0d6efd]">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-[#8b96a5] hover:text-[#0d6efd]">
                <Youtube className="w-6 h-6" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm text-[#8b96a5]">
              <li>
                <Link href="#" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Find store
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Partnership</h3>
            <ul className="space-y-2 text-sm text-[#8b96a5]">
              <li>
                <Link href="#" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Find store
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-sm text-[#8b96a5]">
              <li>
                <Link href="#" className="hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Money Refund
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For users</h3>
            <ul className="space-y-2 text-sm text-[#8b96a5]">
              <li>
                <Link href="#" className="hover:underline">
                  Login
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Register
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Settings
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Get app</h3>
            <div className="flex flex-col gap-2">
              <Link href="#">
                <Image
                  src="/placeholder.svg?height=40&width=120"
                  alt="App Store"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </Link>
              <Link href="#">
                <Image
                  src="/placeholder.svg?height=40&width=120"
                  alt="Google Play"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-[#dee2e7] mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-[#8b96a5]">© 2023 Ecommerce.</p>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Image
              src="/placeholder.svg?height=20&width=30"
              alt="English"
              width={30}
              height={20}
              className="rounded-sm"
            />
            <span className="text-sm">English</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 6L8 10L12 6"
                stroke="#8B96A5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  )
}

