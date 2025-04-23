// app/admin/page.tsx
import { getAdminProducts } from "@/lib/admin-actions";
import AdminPageClient from "./page-client";
import { Product } from "@/types"; // Import the Product type

export default async function AdminPage() {
  // We'll still try to fetch products server-side as a fallback
  let initialProducts: Product[] = [];
  try {
    initialProducts = await getAdminProducts();
  } catch (error) {
    console.error("Error fetching products server-side:", error);
  }
  
  return <AdminPageClient initialProducts={initialProducts} />;
}