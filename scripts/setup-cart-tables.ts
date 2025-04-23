import { db, query } from "@/db/index";
import { config } from "dotenv";
import * as fs from 'fs';
import * as path from 'path';
import { sql } from "drizzle-orm";

// Load environment variables
config({ path: '.env.local' });

async function main() {
  console.log('Starting cart tables setup...');

  try {
    // Check if tables exist
    console.log('Checking if users table exists...');
    const usersTableExists = await tableExists('users');
    console.log('Checking if carts table exists...');
    const cartsTableExists = await tableExists('carts');
    console.log('Checking if cart_items table exists...');
    const cartItemsTableExists = await tableExists('cart_items');

    console.log(`Tables existence - users: ${usersTableExists}, carts: ${cartsTableExists}, cart_items: ${cartItemsTableExists}`);

    // Create only missing tables
    if (!usersTableExists) {
      console.log('Creating users table...');
      await query`
        CREATE TABLE IF NOT EXISTS "users" (
          "id" text PRIMARY KEY NOT NULL,
          "email" text NOT NULL UNIQUE,
          "first_name" text,
          "last_name" text,
          "profile_image" text,
          "is_admin" boolean DEFAULT false NOT NULL,
          "created_at" timestamp DEFAULT now() NOT NULL,
          "updated_at" timestamp DEFAULT now() NOT NULL
        );
      `;
    }

    if (!cartsTableExists) {
      console.log('Creating carts table...');
      await query`
        CREATE TABLE IF NOT EXISTS "carts" (
          "id" serial PRIMARY KEY NOT NULL,
          "user_id" text NOT NULL,
          "created_at" timestamp DEFAULT now() NOT NULL,
          "updated_at" timestamp DEFAULT now() NOT NULL,
          FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
        );
      `;
    }

    if (!cartItemsTableExists) {
      console.log('Creating cart_items table...');
      await query`
        CREATE TABLE IF NOT EXISTS "cart_items" (
          "id" serial PRIMARY KEY NOT NULL,
          "cart_id" integer NOT NULL,
          "product_id" integer NOT NULL,
          "quantity" integer DEFAULT 1 NOT NULL,
          "created_at" timestamp DEFAULT now() NOT NULL,
          "updated_at" timestamp DEFAULT now() NOT NULL,
          FOREIGN KEY ("cart_id") REFERENCES "carts" ("id") ON DELETE CASCADE,
          FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE
        );
      `;

      // Create useful indexes
      await query`
        CREATE INDEX IF NOT EXISTS "cart_items_cart_id_idx" ON "cart_items" ("cart_id");
      `;
      await query`
        CREATE INDEX IF NOT EXISTS "cart_items_product_id_idx" ON "cart_items" ("product_id");
      `;
    }

    if (!cartsTableExists) {
      await query`
        CREATE INDEX IF NOT EXISTS "carts_user_id_idx" ON "carts" ("user_id");
      `;
    }

    console.log('Cart tables setup completed successfully!');

  } catch (error) {
    console.error('Error setting up cart tables:', error);
    process.exit(1);
  }
}

async function tableExists(tableName: string): Promise<boolean> {
  try {
    const result = await query`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = ${tableName}
      );
    `;
    return result[0]?.exists || false;
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error);
    return false;
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Unexpected error:', err);
    process.exit(1);
  });