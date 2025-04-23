"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { updateUserAdminStatus, requestAdminAccess } from "@/lib/user-actions"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

type ProfileInfoProps = {
  user: {
    id: string
    email: string
    firstName: string | null
    lastName: string | null
    profileImage: string | null
    isAdmin: boolean
  } | null
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  if (!user) {
    return <div>No user information available.</div>
  }

  const handleMakeAdmin = async () => {
    if (!user.isAdmin) {
      setLoading(true)
      try {
        // Call the new requestAdminAccess function instead of updateUserAdminStatus
        const result = await requestAdminAccess()
        
        if (result.success) {
          toast({
            title: "Admin status updated",
            description: "Your account now has admin privileges.",
          })
          router.refresh()
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to update admin status.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error updating admin status:", error)
        toast({
          title: "Error",
          description: "Something went wrong.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border border-gray-200">
          <Image
            src={user.profileImage || "/placeholder-user.jpg"}
            alt={`${user.firstName || 'User'}'s profile picture`}
            fill
            className="object-cover"
          />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-500">{user.email}</p>
          
          <div className="mt-2 flex items-center gap-2">
            <span className={`px-2 py-1 text-xs rounded-full ${
              user.isAdmin ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {user.isAdmin ? 'Admin' : 'Customer'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-semibold mb-2">Account Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">First Name</p>
            <p>{user.firstName || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Name</p>
            <p>{user.lastName || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p>{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Account Type</p>
            <p>{user.isAdmin ? 'Administrator' : 'Regular User'}</p>
          </div>
        </div>
      </div>
      
      {!user.isAdmin && (
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-semibold mb-2">Admin Access</h3>
          <p className="text-sm text-gray-500 mb-2">
            Request admin privileges to manage products and view admin dashboard.
          </p>
          <Button 
            onClick={handleMakeAdmin} 
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {loading ? 'Processing...' : 'Request Admin Access'}
          </Button>
          <p className="text-xs text-gray-400 mt-1">
            Note: In a production environment, this would require approval from existing admins.
          </p>
        </div>
      )}
      
      {user.isAdmin && (
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-semibold mb-2">Admin Dashboard</h3>
          <p className="text-sm text-gray-500 mb-2">
            You have admin privileges. You can manage products and view admin dashboard.
          </p>
          <Button 
            onClick={() => router.push('/admin')}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Go to Admin Dashboard
          </Button>
        </div>
      )}
    </div>
  )
}