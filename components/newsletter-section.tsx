import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MailOpenIcon as Envelope } from "lucide-react"

export default function NewsletterSection() {
  return (
    <div className="bg-[#eff2f4] rounded-md p-6 mb-8">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-xl font-semibold mb-2">Subscribe on our newsletter</h2>
        <p className="text-sm text-[#8b96a5] mb-4">
          Get daily news on upcoming offers from many suppliers all over the world
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Envelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8b96a5] w-5 h-5" />
            <Input placeholder="Email" className="pl-10 border-[#dee2e7]" />
          </div>
          <Button className="bg-[#0d6efd] hover:bg-[#0d6efd]/90">Subscribe</Button>
        </div>
      </div>
    </div>
  )
}

