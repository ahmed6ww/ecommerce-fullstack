"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function DebugPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchUserData = async () => {
    setLoading(true);
    try {
      // Call your API endpoint to get the user data with admin status
      const response = await fetch("/api/debug/user-status");
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch user data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch user data when page loads and user is signed in
  useEffect(() => {
    if (isSignedIn) {
      fetchUserData();
    }
  }, [isSignedIn]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Please sign in to view this page.</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">User Debug Information</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Clerk User Information</h2>
        <div className="mb-4">
          <p><strong>User ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}</p>
          <p><strong>Name:</strong> {user.fullName}</p>
          <p><strong>Is Signed In:</strong> {isSignedIn ? "Yes" : "No"}</p>
        </div>

        <Button 
          onClick={fetchUserData} 
          className="bg-blue-500 hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh User Data"}
        </Button>
      </div>

      {userData && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Database User Information</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(userData, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-6">
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
          <p className="text-amber-700">
            <strong>Debug Note:</strong> If the isAdmin value in Database User Information is true but you still can't access
            the admin dashboard, there may be an issue with session synchronization or caching.
          </p>
        </div>
      </div>
    </div>
  );
}