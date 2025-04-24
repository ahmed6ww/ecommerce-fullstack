// db/seed-additional.ts - Additional products for more categories
import { db } from './index';
import { products } from './schema';

async function seedAdditionalProducts() {
  try {
    console.log('Starting to seed additional products...');

    // Define all product categories
    const categories = [
      'Automobiles',
      'Clothes and wear',
      'Home interiors',
      'Computer and tech',
      'Tools, equipment',
      'Sports and outdoor',
      'Animal and pets',
      'Machinery tools',
      'Electronics',
      'Home & Garden',
      'Kitchen'
    ];

    // 100+ additional products across all categories
    const additionalProducts = [
      // Automobiles
      {
        name: 'Car Tire Pressure Monitor',
        price: 35.99,
        image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Digital tire pressure gauge with backlit LCD display. Accurately measures PSI, BAR, KPA and KG/CM². Ideal for cars, trucks, motorcycles, and bicycles.',
        category: 'Automobiles',
        stock: 120
      },
      {
        name: 'Car Dashboard Mount',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Universal car phone holder with strong suction cup and adjustable arm. Compatible with all smartphones and GPS devices.',
        category: 'Automobiles',
        stock: 85
      },
      {
        name: 'Leather Car Seat Covers',
        price: 149.95,
        image: 'https://images.unsplash.com/photo-1603178455924-ef33372953bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Premium PU leather car seat covers with memory foam padding. Universal fit for most sedans and SUVs. Waterproof and easy to clean.',
        category: 'Automobiles',
        stock: 40
      },
      {
        name: 'Car Emergency Kit',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1536767311909-e75ab3d0a287?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Complete roadside emergency kit with jumper cables, flashlight, first aid supplies, tools, and more. Essential for every vehicle owner.',
        category: 'Automobiles',
        stock: 65
      },
      {
        name: 'Car Wax and Polish Kit',
        price: 45.50,
        image: 'https://images.unsplash.com/photo-1591364169797-e070339507ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Professional-grade car waxing and polishing kit. Includes carnauba wax, microfiber cloths, applicator pads, and premium car soap.',
        category: 'Automobiles',
        stock: 55
      },
      {
        name: 'Car Vacuum Cleaner',
        price: 59.95,
        image: 'https://images.unsplash.com/photo-1568113703333-5db58e772a41?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Handheld car vacuum with powerful suction and HEPA filter. Includes multiple attachments for hard-to-reach areas. Plugs into 12V outlet.',
        category: 'Automobiles',
        stock: 70
      },
      {
        name: 'Car Air Freshener Set',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1619641953668-b3cf9671664e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Set of 6 premium car air fresheners in assorted scents. Long-lasting fragrance for up to 60 days per unit.',
        category: 'Automobiles',
        stock: 130
      },
      {
        name: 'Car Battery Charger',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1629311985134-af1ca1319f81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Smart battery charger with auto-detect technology. Maintains and charges 6V/12V batteries for cars, boats, motorcycles, and more.',
        category: 'Automobiles',
        stock: 45
      },
      {
        name: 'Car Dash Cam',
        price: 129.95,
        image: 'https://images.unsplash.com/photo-1615887101375-14847ef33568?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '4K dash camera with night vision, GPS, and Wi-Fi. G-sensor automatically records and saves footage in case of collision.',
        category: 'Automobiles',
        stock: 38
      },
      {
        name: 'Car Sun Shade',
        price: 17.99,
        image: 'https://images.unsplash.com/photo-1608826057900-a8bf14fa76b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Foldable car windshield sun shade blocks harmful UV rays. Keeps vehicle interior cool and protects dashboard from sun damage.',
        category: 'Automobiles',
        stock: 95
      },
      
      // Clothes and wear
      {
        name: 'Wool Winter Coat',
        price: 189.99,
        image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Premium wool blend winter coat with satin lining. Classic design with notched lapels and double-breasted front. Available in multiple colors.',
        category: 'Clothes and wear',
        stock: 45
      },
      {
        name: 'Denim Jacket',
        price: 69.95,
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Classic denim jacket with button front closure and chest pockets. Versatile wardrobe staple that goes with everything.',
        category: 'Clothes and wear',
        stock: 75
      },
      {
        name: 'Silk Dress Shirt',
        price: 89.50,
        image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '100% silk dress shirt with French cuffs and spread collar. Luxurious feel with a subtle sheen. Perfect for formal occasions.',
        category: 'Clothes and wear',
        stock: 60
      },
      {
        name: 'Leather Dress Shoes',
        price: 159.99,
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Handcrafted Italian leather Oxford shoes with burnished toe. Goodyear welted construction for durability and comfort.',
        category: 'Clothes and wear',
        stock: 42
      },
      {
        name: 'Cashmere Sweater',
        price: 129.95,
        image: 'https://images.unsplash.com/photo-1580331452190-048ebb6638a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Pure cashmere crew neck sweater. Incredibly soft and warm with ribbed cuffs and hem. Sustainably sourced from Mongolia.',
        category: 'Clothes and wear',
        stock: 36
      },
      {
        name: 'Designer Sunglasses',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Polarized sunglasses with UV400 protection. Lightweight acetate frames with stainless steel hinges. Includes hard case and cleaning cloth.',
        category: 'Clothes and wear',
        stock: 50
      },
      {
        name: 'Canvas Sneakers',
        price: 59.95,
        image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Classic canvas sneakers with rubber soles. Breathable, comfortable, and versatile. Perfect for casual everyday wear.',
        category: 'Clothes and wear',
        stock: 85
      },
      {
        name: 'Designer Watch',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Luxury analog watch with stainless steel case and genuine leather strap. Japanese quartz movement with date display. Water-resistant to 50m.',
        category: 'Clothes and wear',
        stock: 32
      },
      {
        name: 'Cotton Pajama Set',
        price: 45.99,
        image: 'https://images.unsplash.com/photo-1617952986600-802af2a6e672?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '100% organic cotton pajama set. Breathable, soft, and comfortable for year-round wear. Button-up top with elastic waist pants.',
        category: 'Clothes and wear',
        stock: 68
      },
      {
        name: 'Leather Belt',
        price: 39.95,
        image: 'https://images.unsplash.com/photo-1553531889-e6cf4d692b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Full-grain leather belt with brushed metal buckle. Handcrafted in small batches. Perfect for both casual and formal wear.',
        category: 'Clothes and wear',
        stock: 75
      },
      
      // Home interiors
      {
        name: 'Velvet Throw Pillows Set',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1604064432806-b1b927dba674?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Set of 4 luxurious velvet throw pillows in assorted colors. Hidden zipper design with removable covers for easy cleaning.',
        category: 'Home interiors',
        stock: 60
      },
      {
        name: 'Modern Area Rug',
        price: 159.95,
        image: 'https://images.unsplash.com/photo-1574118140238-fd751a59eaae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Contemporary geometric area rug made from soft polypropylene. Stain-resistant and durable for high-traffic areas. Available in multiple sizes.',
        category: 'Home interiors',
        stock: 35
      },
      {
        name: 'Wall Art Canvas Set',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1559599238-308793637427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Set of 3 framed canvas prints featuring abstract designs. Ready to hang with pre-installed hardware. Perfect for living room or bedroom.',
        category: 'Home interiors',
        stock: 42
      },
      {
        name: 'Crystal Table Lamp',
        price: 89.95,
        image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Elegant table lamp with crystal base and linen shade. Creates warm ambient lighting perfect for bedroom or living room.',
        category: 'Home interiors',
        stock: 28
      },
      {
        name: 'Floating Wall Shelves',
        price: 69.99,
        image: 'https://images.unsplash.com/photo-1594620302200-9a34c4a3de5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Set of 3 wooden floating shelves with invisible mounting hardware. Rustic farmhouse design works in any room. Easy to install.',
        category: 'Home interiors',
        stock: 54
      },
      {
        name: 'Cotton Throw Blanket',
        price: 45.50,
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '100% organic cotton knit throw blanket. Soft, breathable, and perfect for curling up on the couch. Machine washable for easy care.',
        category: 'Home interiors',
        stock: 70
      },
      {
        name: 'Decorative Wall Mirror',
        price: 119.99,
        image: 'https://images.unsplash.com/photo-1616627577385-5c0c4dab0257?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Round wall mirror with brushed gold frame. Creates the illusion of more space and adds elegance to any room.',
        category: 'Home interiors',
        stock: 32
      },
      {
        name: 'Indoor Plant Set',
        price: 79.95,
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Set of 3 low-maintenance indoor plants in decorative ceramic pots. Perfect for purifying air and adding natural beauty to your home.',
        category: 'Home interiors',
        stock: 45
      },
      {
        name: 'Scented Candle Collection',
        price: 54.99,
        image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Set of 4 premium soy wax candles in seasonal scents. Each candle burns for approximately 45 hours. Makes a great gift.',
        category: 'Home interiors',
        stock: 65
      },
      {
        name: 'Accent Wall Clock',
        price: 39.95,
        image: 'https://images.unsplash.com/photo-1597484662317-c03a53ac0704?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '18-inch decorative wall clock with silent quartz movement. Modern design with large easy-to-read numbers. Requires one AA battery (included).',
        category: 'Home interiors',
        stock: 48
      },
      
      // Computer and tech
      {
        name: 'Mechanical Keyboard',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1595044426077-d36d9236d44e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'RGB mechanical gaming keyboard with Cherry MX switches. Programmable macros and customizable backlighting. Durable aluminum frame.',
        category: 'Computer and tech',
        stock: 45
      },
      {
        name: 'Ultra-wide Monitor',
        price: 399.95,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '34-inch curved ultrawide monitor with WQHD resolution. 144Hz refresh rate and 1ms response time. Perfect for productivity and gaming.',
        category: 'Computer and tech',
        stock: 25
      },
      {
        name: 'Noise-Cancelling Headphones',
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Wireless noise-cancelling headphones with up to 30 hours battery life. Premium sound quality with deep bass and crisp highs.',
        category: 'Computer and tech',
        stock: 40
      },
      {
        name: 'Wireless Mouse',
        price: 59.95,
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Ergonomic wireless mouse with 6 programmable buttons. High-precision optical sensor with adjustable DPI. Up to 12 months battery life.',
        category: 'Computer and tech',
        stock: 65
      },
      {
        name: 'External SSD',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1628557044797-f21a177c37ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '1TB portable SSD with USB-C connectivity. Transfer speeds up to 1050MB/s. Shock-resistant and compact for easy portability.',
        category: 'Computer and tech',
        stock: 38
      },
      {
        name: 'Webcam 4K',
        price: 89.95,
        image: 'https://images.unsplash.com/photo-1622959588051-92b175dcee91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '4K UHD webcam with autofocus and dual stereo mics. Wide-angle lens captures more of your scene. Perfect for streaming and video calls.',
        category: 'Computer and tech',
        stock: 52
      },
      {
        name: 'Laptop Cooling Pad',
        price: 35.99,
        image: 'https://images.unsplash.com/photo-1598639753368-c1fe205b9125?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Laptop cooling pad with 5 quiet fans and LED lighting. Height adjustable with 2 USB ports. Compatible with laptops up to 17 inches.',
        category: 'Computer and tech',
        stock: 70
      },
      {
        name: 'Graphics Tablet',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1626968361222-291e74711449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Drawing tablet with 8192 levels of pressure sensitivity. Battery-free stylus with tilt recognition. Compatible with major design software.',
        category: 'Computer and tech',
        stock: 30
      },
      {
        name: 'USB-C Hub',
        price: 45.95,
        image: 'https://images.unsplash.com/photo-1625542535237-c9f79760d671?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '7-in-1 USB-C hub with HDMI, SD/TF card readers, 3 USB 3.0 ports, and 100W power delivery. Compact aluminum design.',
        category: 'Computer and tech',
        stock: 85
      },
      {
        name: 'Smart Desk Lamp',
        price: 69.99,
        image: 'https://images.unsplash.com/photo-1534014648452-f95fef4d17cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'LED desk lamp with wireless charging pad and USB port. Touch controls with 5 brightness levels and 5 color temperatures.',
        category: 'Computer and tech',
        stock: 48
      },
      
      // Tools, equipment
      {
        name: 'Cordless Drill Set',
        price: 149.95,
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '20V lithium-ion cordless drill with 2 batteries, charger, and 60-piece accessory kit. Variable speed with LED work light.',
        category: 'Tools, equipment',
        stock: 42
      },
      {
        name: 'Precision Screwdriver Kit',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1542759564-7ccbb6ac450a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '60-in-1 precision screwdriver set for electronics repair. Magnetic bits with flexible shaft extension. Perfect for phones, laptops, and more.',
        category: 'Tools, equipment',
        stock: 75
      },
      {
        name: 'Portable Air Compressor',
        price: 89.95,
        image: 'https://images.unsplash.com/photo-1621415814107-1ee42ea00cb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Rechargeable portable air compressor with digital pressure gauge. Inflates car tires, bikes, sports equipment, and more. Includes adapters.',
        category: 'Tools, equipment',
        stock: 35
      },
      {
        name: 'Laser Level',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1572980689099-7d340625c6a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Self-leveling cross-line laser level with 50ft range. Bright green laser lines for better visibility. Includes magnetic mounting bracket.',
        category: 'Tools, equipment',
        stock: 28
      },
      {
        name: 'Digital Caliper',
        price: 39.95,
        image: 'https://images.unsplash.com/photo-1582036683858-77280bb01fe4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Electronic digital caliper measures in inches and millimeters. LCD display with 0.001" accuracy. Perfect for woodworking, metalwork, and more.',
        category: 'Tools, equipment',
        stock: 52
      },
      {
        name: 'Adjustable Wrench Set',
        price: 45.99,
        image: 'https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Set of 3 chrome-plated adjustable wrenches in 6", 8", and 10" sizes. Precision machined jaws with measurement scales.',
        category: 'Tools, equipment',
        stock: 60
      },
      {
        name: 'Rotary Tool Kit',
        price: 119.95,
        image: 'https://images.unsplash.com/photo-1426024084828-5da21e13f5dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Variable speed rotary tool with 100-piece accessory kit. Perfect for cutting, grinding, polishing, and engraving. Includes storage case.',
        category: 'Tools, equipment',
        stock: 38
      },
      {
        name: 'Soldering Iron Station',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1655720031554-a929595ffad7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Digital soldering station with temperature control and LED display. Includes multiple tips, solder wire, and cleaning tools.',
        category: 'Tools, equipment',
        stock: 25
      },
      {
        name: 'Tool Chest Combo',
        price: 299.95,
        image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Rolling tool chest and cabinet combo with 10 drawers. Ball-bearing slides for smooth operation. Includes keyed locking system.',
        category: 'Tools, equipment',
        stock: 20
      },
      {
        name: 'Pipe Wrench Set',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Set of 2 heavy-duty pipe wrenches in 10" and 14" sizes. Drop-forged steel construction with hardened teeth for secure grip.',
        category: 'Tools, equipment',
        stock: 45
      },

      // Sports and outdoor
      {
        name: 'Hiking Backpack',
        price: 89.95,
        image: 'https://images.unsplash.com/photo-1551223875-f8e4bc1c8b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '45L waterproof hiking backpack with internal frame. Multiple compartments, hydration sleeve, and rain cover included.',
        category: 'Sports and outdoor',
        stock: 50
      },
      {
        name: 'Yoga Mat',
        price: 35.99,
        image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Non-slip yoga mat made from eco-friendly TPE material. 6mm thick for extra cushioning. Includes carrying strap.',
        category: 'Sports and outdoor',
        stock: 75
      },
      {
        name: 'Tennis Racket',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1622279457486-28f95bcfd72b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Professional tennis racket with graphite composite frame. Mid-plus head size for balance of power and control. Includes protective cover.',
        category: 'Sports and outdoor',
        stock: 35
      },
      {
        name: 'Camping Tent',
        price: 159.95,
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '3-season dome tent for up to 4 people. Waterproof with mesh panels for ventilation. Easy 10-minute setup.',
        category: 'Sports and outdoor',
        stock: 30
      },
      {
        name: 'Adjustable Dumbbells',
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Pair of adjustable dumbbells from 5 to 52.5 lbs per hand. Space-saving design replaces 15 sets of weights. Includes storage tray.',
        category: 'Sports and outdoor',
        stock: 25
      },
      {
        name: 'Fitness Tracker Watch',
        price: 79.95,
        image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd621?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Waterproof fitness tracker with heart rate monitor and GPS. Tracks steps, calories, sleep, and 14+ exercise modes.',
        category: 'Sports and outdoor',
        stock: 60
      },
      {
        name: 'Basketball',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Official size and weight basketball with composite leather cover. Superior grip and durability for indoor/outdoor play.',
        category: 'Sports and outdoor',
        stock: 85
      },
      {
        name: 'Fishing Rod Combo',
        price: 89.95,
        image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Spinning rod and reel combo with telescopic design. Includes tackle box with lures, hooks, and line. Perfect for beginners and pros.',
        category: 'Sports and outdoor',
        stock: 40
      },
      {
        name: 'Mountain Bike',
        price: 599.99,
        image: 'https://images.unsplash.com/photo-1574952180232-519388ef23e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Aluminum frame mountain bike with 21-speed Shimano drivetrain. Front suspension fork and disc brakes for control on rough terrain.',
        category: 'Sports and outdoor',
        stock: 15
      },
      {
        name: 'Golf Club Set',
        price: 349.95,
        image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Complete golf club set including driver, fairway woods, irons, wedges, and putter. Includes stand bag with plenty of pockets.',
        category: 'Sports and outdoor',
        stock: 20
      },

      // Animal and pets
      {
        name: 'Pet Carrier',
        price: 49.95,
        image: 'https://images.unsplash.com/photo-1553775282-20af80779df7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Airline-approved soft-sided pet carrier with mesh ventilation. Comfortable for cats and small dogs up to 15 lbs. Includes safety strap.',
        category: 'Animal and pets',
        stock: 45
      },
      {
        name: 'Automatic Pet Feeder',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1653681105237-b1618a592553?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Programmable pet feeder dispenses up to 4 meals per day. Customizable portion sizes and voice recording to call your pet.',
        category: 'Animal and pets',
        stock: 32
      },
      {
        name: 'Dog Training Leash',
        price: 24.95,
        image: 'https://images.unsplash.com/photo-1526440890073-afbf2a0e079c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Reflective dog training leash with padded handle. 6 feet long with dual-handle design for better control during walks.',
        category: 'Animal and pets',
        stock: 65
      },
      {
        name: 'Cat Tree Tower',
        price: 119.99,
        image: 'https://images.unsplash.com/photo-1583511655802-41f2ceb9b3ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Multi-level cat tree with scratching posts, dangling toys, and plush perches. Stable construction with soft material covering.',
        category: 'Animal and pets',
        stock: 25
      },
      {
        name: 'Pet GPS Tracker',
        price: 59.95,
        image: 'https://images.unsplash.com/photo-1539683727899-56a23264423e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Waterproof GPS tracker for dogs and cats. Real-time location tracking with geofence alerts. Attaches to any collar.',
        category: 'Animal and pets',
        stock: 40
      },
      {
        name: 'Aquarium Starter Kit',
        price: 129.95,
        image: 'https://images.unsplash.com/photo-1507477954447-cdddca68689c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '20-gallon glass aquarium kit with LED lighting, filter, heater, and water conditioner. Perfect for beginners.',
        category: 'Animal and pets',
        stock: 18
      },
      {
        name: 'Premium Pet Food',
        price: 45.99,
        image: 'https://images.unsplash.com/photo-1603854872753-c18293115876?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'All-natural grain-free pet food with real meat as first ingredient. No artificial colors or preservatives. 15 lb bag.',
        category: 'Animal and pets',
        stock: 55
      },
      {
        name: 'Interactive Pet Toy',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1616836516633-9a2398835fab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Interactive puzzle toy that dispenses treats. Challenges pets mentally and slows down eating. Dishwasher safe.',
        category: 'Animal and pets',
        stock: 48
      },
      {
        name: 'Pet Grooming Kit',
        price: 39.95,
        image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Complete pet grooming kit with clippers, scissors, nail trimmer, and brushes. Rechargeable with low noise operation.',
        category: 'Animal and pets',
        stock: 38
      },
      {
        name: 'Heated Pet Bed',
        price: 54.99,
        image: 'https://images.unsplash.com/photo-1549221952-37f5dc2389e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Thermostatically controlled heated pet bed with removable washable cover. Uses only 6 watts of electricity.',
        category: 'Animal and pets',
        stock: 30
      },
      
      // Machinery tools
      {
        name: 'Bench Grinder',
        price: 119.95,
        image: 'https://images.unsplash.com/photo-1572981904872-fde195db56a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '8-inch bench grinder with dual grinding wheels. Cast iron base reduces vibration. Includes eye shields and tool rests.',
        category: 'Machinery tools',
        stock: 22
      },
      {
        name: 'Portable Band Saw',
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1598458255753-cf99bb3907c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Compact portable band saw cuts a variety of materials. Variable speed control with ergonomic grip. Includes hard carrying case.',
        category: 'Machinery tools',
        stock: 15
      },
      {
        name: 'Benchtop Drill Press',
        price: 179.95,
        image: 'https://images.unsplash.com/photo-1563113613-93ae94681d74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '10-inch benchtop drill press with 5-speed settings. Cast iron work table tilts up to 45°. Includes laser alignment system.',
        category: 'Machinery tools',
        stock: 18
      },
      {
        name: 'Welding Machine',
        price: 379.99,
        image: 'https://images.unsplash.com/photo-1619365734040-b2c919641948?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Multi-process welder handles MIG, TIG, and stick welding. 140A output with thermal overload protection. Includes accessory kit.',
        category: 'Machinery tools',
        stock: 12
      },
      {
        name: 'Air Impact Wrench',
        price: 129.95,
        image: 'https://images.unsplash.com/photo-1601051297657-b024e193e1ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Heavy-duty pneumatic impact wrench delivers 1,200 ft-lbs of torque. Lightweight composite housing reduces user fatigue.',
        category: 'Machinery tools',
        stock: 28
      },
      {
        name: 'Portable Air Compressor',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1617950952595-f09fa4013ea5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '6-gallon pancake air compressor. Oil-free pump for less maintenance. 150 PSI max pressure with quick recovery time.',
        category: 'Machinery tools',
        stock: 20
      },
      {
        name: 'Metal Cutting Saw',
        price: 219.95,
        image: 'https://images.unsplash.com/photo-1534609146522-5d8de8d42658?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '14-inch abrasive cut-off saw for metal cutting. 15A motor with 4,000 RPM. Quick-release vise for fast and accurate cuts.',
        category: 'Machinery tools',
        stock: 16
      },
      {
        name: 'Engine Hoist',
        price: 349.99,
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '2-ton capacity foldable engine hoist. 6-position boom extends from 34" to 64". Heavy-duty steel construction.',
        category: 'Machinery tools',
        stock: 10
      },
      {
        name: 'Industrial Vacuum',
        price: 159.95,
        image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Heavy-duty wet/dry vacuum with 6.5 HP motor. 16-gallon capacity with stainless steel tank. Includes multiple attachments.',
        category: 'Machinery tools',
        stock: 24
      },
      {
        name: 'Hydraulic Floor Jack',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1620553967564-64071ab5fa46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '3-ton capacity hydraulic floor jack with rapid lift technology. Low-profile design fits under most vehicles. Built-in safety valve.',
        category: 'Machinery tools',
        stock: 30
      }
    ];

    // Insert the products into the database
    const insertedProducts = await db.insert(products).values(additionalProducts).returning();
    
    console.log(`✅ Successfully seeded ${insertedProducts.length} additional products across all categories!`);

  } catch (error) {
    console.error('Error seeding additional products:', error);
    process.exit(1);
  }

  process.exit(0);
}

seedAdditionalProducts();