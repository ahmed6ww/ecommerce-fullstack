-- Custom SQL migration file, put your code below! --

-- Add the discount column to the products table
ALTER TABLE products ADD COLUMN discount integer NOT NULL DEFAULT 0;