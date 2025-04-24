'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useUser, useClerk, SignedIn, SignedOut } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export default function UserWelcomePanel() {
  const { user, isLoaded, isSignedIn } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  // Handle redirect to sign-in page
  const handleSignIn = () => {
    router.push('/sign-in')
  }

  // Handle redirect to sign-up page
  const handleSignUp = () => {
    router.push('/sign-up')
  }

  // Handle sign out
  const handleSignOut = async () => {
    try {
      setIsSigningOut(true)
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setIsSigningOut(false)
    }
  }

  // Display a loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="md:block hidden bg-white rounded-md border border-[#dee2e7] p-4 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="h-9 bg-gray-200 rounded-md"></div>
        <div className="h-9 bg-gray-200 rounded-md"></div>
      </div>
    )
  }

  return (
    <div className="hidden md:flex h-[23rem] flex-col gap-3 bg-white rounded-md border border-[#dee2e7] p-4">
      <SignedIn>
        {/* Content for authenticated users */}
        <div className="flex items-center gap-3">
          <Image
            src={user?.imageUrl || "/placeholder-user.jpg"}
            alt={user?.fullName || "User"}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium">Welcome back,</p>
            <p className="text-sm">{user?.firstName || user?.username}</p>
          </div>
        </div>
        
        <Link href="/profile" passHref>
          <Button className="w-full bg-[#0d6efd] hover:bg-[#0d6efd]/90 text-sm">
            My Profile
          </Button>
        </Link>
        
        <Button 
          variant="outline" 
          className="w-full text-sm" 
          onClick={handleSignOut}
          disabled={isSigningOut}
        >
          {isSigningOut ? "Signing out..." : "Sign out"}
        </Button>
      </SignedIn>
      
      <SignedOut>
        {/* Content for non-authenticated users */}
        <div className="flex items-center gap-3">
          <Image
            src="/placeholder-user.jpg"
            alt="User"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium">Welcome!</p>
            <p className="text-sm text-gray-500">Sign in to your account</p>
          </div>
        </div>

        <Button 
          className="w-full bg-[#0d6efd] hover:bg-[#0d6efd]/90 text-sm"
          onClick={handleSignIn}
        >
          Sign In
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full text-sm"
          onClick={handleSignUp}
        >
          Register
        </Button>

      </SignedOut>
      <div className="mt-2 p-3 bg-[#f38332]/20 rounded-md">
                  <p className="text-sm font-medium">Get US $10 off</p>
                  <p className="text-xs text-[#8b96a5]">with a new supplier</p>
                </div>

                <div className="p-3 bg-[#55bdc3]/20 rounded-md">
                  <p className="text-sm font-medium">Send quotes with</p>
                  <p className="text-xs text-[#8b96a5]">supplier preferences</p>
                </div>
    </div>
  )
}