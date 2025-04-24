// Script to run the additional seed file
console.log('Running additional seed script...');
require('ts-node').register({ transpileOnly: true });
require('../db/seed-additional.ts');