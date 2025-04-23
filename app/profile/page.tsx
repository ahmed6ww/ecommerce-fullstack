import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { getCurrentUserWithData } from "@/lib/user-actions";
import ProfileInfo from "@/components/profile-info";

export default async function ProfilePage() {
  const user = await currentUser();
  
  // Redirect to sign-in if not authenticated
  if (!user) {
    redirect("/sign-in");
  }
  
  // Get additional user data from our database
  const userData = await getCurrentUserWithData();
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      
      <div className="bg-white rounded-md border border-gray-200 p-6">
        <ProfileInfo user={userData} />
      </div>
    </div>
  );
}