// src/db/seed.ts
import { db } from './index';
import { products } from './schema';

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // First, clear existing data (optional)
    console.log('Clearing existing products...');
    await db.delete(products);

    // Sample product data
    const sampleProducts = [
      {
        name: 'Wireless Bluetooth Headphones',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Premium wireless headphones with noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers and professionals who need clear sound quality.',
        category: 'Electronics',
        stock: 45
      },
      {
        name: 'Organic Cotton T-Shirt',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Sustainably sourced 100% organic cotton t-shirt. Soft, breathable fabric with a relaxed fit. Available in multiple colors and sizes.',
        category: 'Clothing',
        stock: 120
      },
      {
        name: 'Smart Fitness Watch',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Track your workouts, heart rate, sleep, and more. Water-resistant with a 7-day battery life. Connects to your smartphone for notifications and music control.',
        category: 'Electronics',
        stock: 32
      },
      {
        name: 'Stainless Steel Water Bottle',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1602213156672-31e5e7fcb886?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Double-walled vacuum insulated bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly alternative to plastic bottles.',
        category: 'Home & Kitchen',
        stock: 78
      },
      {
        name: 'Leather Messenger Bag',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Handcrafted genuine leather messenger bag with adjustable strap, multiple compartments, and padded laptop sleeve. Perfect for work, school, or travel.',
        category: 'Accessories',
        stock: 15
      },
      {
        name: 'Ceramic Plant Pot Set',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Set of 3 minimalist ceramic plant pots in varying sizes. Modern design with drainage holes and bamboo trays. Perfect for succulents, herbs, or small indoor plants.',
        category: 'Home & Garden',
        stock: 23
      },
      {
        name: 'Wireless Charging Pad',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1608755728617-aefab37d4a97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek, compact design with LED indicator and non-slip surface. No more tangled cables!',
        category: 'Electronics',
        stock: 57
      },
      {
        name: 'Bamboo Cutting Board',
        price: 24.95,
        image: 'https://images.unsplash.com/photo-1598003306877-03c697809e8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Premium bamboo cutting board with juice groove and handles. Naturally antimicrobial and knife-friendly. Sustainable alternative to plastic cutting boards.',
        category: 'Kitchen',
        stock: 42
      },
      {
        name: 'Natural Scented Candle',
        price: 18.50,
        image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Hand-poured soy wax candle with essential oils. Long-burning with notes of lavender, eucalyptus, and cedarwood. Comes in a reusable glass jar.',
        category: 'Home',
        stock: 34
      },
      {
        name: 'Portable Bluetooth Speaker',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Compact waterproof Bluetooth speaker with 360° sound and deep bass. 12-hour battery life and built-in microphone for calls. Perfect for outdoor adventures.',
        category: 'Electronics',
        stock: 28
      }
    ];

    // Insert products
    console.log('Inserting sample products...');
    const insertedProducts = await db.insert(products).values(sampleProducts).returning();
    
    console.log(`✅ Successfully seeded ${insertedProducts.length} products!`);
    console.table(insertedProducts.map(p => ({ id: p.id, name: p.name, category: p.category })));

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }

  process.exit(0);
}

seed();