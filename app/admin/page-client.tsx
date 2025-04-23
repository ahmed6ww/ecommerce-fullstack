"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import ProductList from "@/components/admin/product-list";
import ProductForm from "@/components/admin/product-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";

interface AdminPageClientProps {
  initialProducts: Product[];
}

export default function AdminPageClient({ initialProducts }: AdminPageClientProps) {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [isLoading, setIsLoading] = useState(true);

  // Check admin status on component mount
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!isSignedIn) {
        router.push("/sign-in");
        return;
      }

      try {
        const response = await fetch("/api/debug/user-status");
        const data = await response.json();
        
        const hasAdminRights = data.hasAdminInDb;
        setIsAdmin(hasAdminRights);
        
        if (!hasAdminRights) {
          router.push("/");
        } else {
          // Fetch products if we have admin rights
          const productsResponse = await fetch("/api/admin/products");
          if (productsResponse.ok) {
            const productsData = await productsResponse.json();
            setProducts(productsData.products);
          }
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoaded) {
      checkAdminStatus();
    }
  }, [isLoaded, isSignedIn, router]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-500">Verifying admin access...</p>
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-500 mb-6">You don't have permission to access this page.</p>
        <Button onClick={() => router.push("/")}>Return to Home</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="create">Add New Product</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-4">
          <h2 className="text-xl font-semibold">Manage Products</h2>
          <ProductList products={products} />
        </TabsContent>
        
        <TabsContent value="create" className="space-y-4">
          <h2 className="text-xl font-semibold">Add New Product</h2>
          <ProductForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}