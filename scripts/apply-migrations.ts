import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
config({ path: '.env.local' });

async function main() {
  // Validate environment variables
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not defined in .env.local');
    process.exit(1);
  }

  console.log('Connecting to database...');
  
  // Create SQL client for Neon
  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);
  
  console.log('Applying migrations...');
  
  // Apply migrations
  try {
    await migrate(db, { migrationsFolder: './migrations' });
    console.log('Migrations completed successfully!');
  } catch (error) {
    console.error('Error applying migrations:', error);
    
    // Attempt to apply the specific migration file if the full migration fails
    console.log('Attempting to apply user_cart_schema migration directly...');
    
    try {
      const cartMigrationPath = path.join(process.cwd(), 'migrations', '0003_user_cart_schema.sql');
      const cartMigrationSql = fs.readFileSync(cartMigrationPath, 'utf8');
      
      // Execute the SQL using tagged template literal as required by Neon
      await sql`${cartMigrationSql}`;
      console.log('Cart migration applied successfully!');
    } catch (fallbackError) {
      console.error('Failed to apply cart migration directly:', fallbackError);
      process.exit(1);
    }
  }
  
  process.exit(0);
}

main().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});