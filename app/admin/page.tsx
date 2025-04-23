// app/admin/page.tsx
import { redirect } from "next/navigation";
import { getAdminProducts } from "@/lib/admin-actions";
import ProductList from "@/components/admin/product-list";
import ProductForm from "@/components/admin/product-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { checkUserIsAdmin } from "@/lib/user-actions";

export default async function AdminPage() {
  // Check if the current user is an admin
  const isAdmin = await checkUserIsAdmin();
  
  // If not admin, redirect to home page
  if (!isAdmin) {
    redirect("/");
  }
  
  // Fetch all products for the admin view
  const products = await getAdminProducts();

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