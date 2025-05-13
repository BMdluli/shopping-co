require("dotenv").config("../.env");
const mongoose = require("mongoose");
const Product = require("../models/product");
const Review = require("../models/review");

// Sample review data (if you're embedding reviews)
// const sampleReviews = [
//   {
//     userId: new mongoose.Types.ObjectId(), // Replace with actual user ObjectIds if needed
//     username: 'Reviewer One',
//     rating: 5,
//     comment: 'Amazing product!',
//   },
//   {
//     userId: new mongoose.Types.ObjectId(),
//     username: 'Second Opinion',
//     rating: 4,
//     comment: 'Good quality, fits well.',
//   },
// ];

const seedProducts = [
  {
    name: "T-shirt with Tape Details",
    price: 1200,
    description: "A comfortable and versatile t-shirt for everyday wear.",
    category: "t-shirts",
    imageUrl:
      "https://res.cloudinary.com/dtwnppsc6/image/upload/v1745397891/shopping-co/i3s3aqn08kbfzah6suo1.png",
    sizes: [
      { size: "small", quantity: 50 },
      { size: "medium", quantity: 65 },
      { size: "large", quantity: 40 },
      { size: "x-Large", quantity: 30 },
    ],
    sold: 5,
    isSale: true,
    salePrice: 700,
  },
  {
    name: "Skinny Fit Jeans",
    price: 2400,
    description: "Modern and fashionable jeans for any occasion.",
    category: "Jeans",
    imageUrl:
      "https://res.cloudinary.com/dtwnppsc6/image/upload/v1745397892/shopping-co/gvrw4c6wpxi631mrzdgu.png",
    sizes: [
      { size: "small", quantity: 30 },
      { size: "medium", quantity: 55 },
      { size: "large", quantity: 45 },
      { size: "x-Large", quantity: 20 },
    ],
    sold: 100,
    isSale: false,
  },
  {
    name: "Checkered Shirt",
    price: 1800,
    description: "High-performance running shoes for athletes.",
    category: "shirts",
    imageUrl:
      "https://res.cloudinary.com/dtwnppsc6/image/upload/v1745397892/shopping-co/sconjmddgcojwuufs0oq.png",
    sizes: [
      { size: "small", quantity: 25 },
      { size: "medium", quantity: 40 },
      { size: "large", quantity: 35 },
      { size: "x-Large", quantity: 15 },
    ],
    sold: 123,
    isSale: false,
  },
  {
    name: "Sleve Striped T-shirt",
    price: 1600,
    description: "A comfortable and fancy striped t-shirt for everyday wear.",
    category: "t-shirts",
    imageUrl:
      "https://res.cloudinary.com/dtwnppsc6/image/upload/v1745397891/shopping-co/zlvbj2qdcogntuyzs6di.png",
    sizes: [
      { size: "small", quantity: 25 },
      { size: "medium", quantity: 40 },
      { size: "large", quantity: 35 },
      { size: "x-Large", quantity: 15 },
    ],
    sold: 90,
    isSale: true,
    salePrice: 1000,
  },

  {
    name: "AAPE BY *A BATHING APE®",
    price: 1854,
    description: "graphic-print T-shirt",
    category: "t-shirts",
    imageUrl:
      "https://res.cloudinary.com/dtwnppsc6/image/upload/v1747117124/shopping-co/AAPE_BY_A_BATHING_APE_tqglqi.webp",
    sizes: [
      { size: "small", quantity: 25 },
      { size: "medium", quantity: 40 },
      { size: "large", quantity: 35 },
      { size: "x-Large", quantity: 15 },
    ],
    sold: 500,
    isSale: false,
  },

  {
    name: "Karl Lagerfeld",
    price: 2600,
    description: "Ikon-patch T-shirt.",
    category: "t-shirts",
    imageUrl:
      "https://res.cloudinary.com/dtwnppsc6/image/upload/v1747117124/shopping-co/Karl_Lagerfeld_tfkngt.webp",
    sizes: [
      { size: "small", quantity: 25 },
      { size: "medium", quantity: 40 },
      { size: "large", quantity: 35 },
      { size: "x-Large", quantity: 15 },
    ],
    sold: 90,
    isSale: false,
  },

  {
    name: "Nike",
    price: 864,
    description: "Dri-FIT Stride 'Blue' shorts",
    category: "shorts",
    imageUrl:
      "https://res.cloudinary.com/dtwnppsc6/image/upload/v1747117522/shopping-co/Nike_fl1c6m.webp",
    sizes: [
      { size: "small", quantity: 25 },
      { size: "medium", quantity: 40 },
      { size: "large", quantity: 35 },
      { size: "x-Large", quantity: 15 },
    ],
    sold: 90,
    isSale: false,
  },

  {
    name: "CHOCOOLATE",
    price: 900,
    description: "logo print cotton shorts",
    category: "shorts",
    imageUrl:
      "https://res.cloudinary.com/dtwnppsc6/image/upload/v1747117521/shopping-co/CHOCOOLATE_qduqqv.webp",
    sizes: [
      { size: "small", quantity: 25 },
      { size: "medium", quantity: 40 },
      { size: "large", quantity: 35 },
      { size: "x-Large", quantity: 15 },
    ],
    sold: 90,
    isSale: false,
  },

  {
    name: "Acne Studios",
    price: 16000,
    description: "Wide leg jeans.",
    category: "jeans",
    imageUrl:
      "https://res.cloudinary.com/dtwnppsc6/image/upload/v1747116238/shopping-co/Acne_Studios_nwhtfx.webp",
    sizes: [
      { size: "small", quantity: 25 },
      { size: "medium", quantity: 40 },
      { size: "large", quantity: 35 },
      { size: "x-Large", quantity: 15 },
    ],
    sold: 7,
    isSale: true,
    salePrice: 10000,
  },

  {
    name: "Who Decides War",
    price: 3906,
    description: "x A Boogie Wit Da Hoodie Better Off Alone 'BLACK' hoodie.",
    category: "hoodie",
    imageUrl:
      "https://res.cloudinary.com/dtwnppsc6/image/upload/v1747118294/shopping-co/Who_Decides_War_cedssg.webp",
    sizes: [
      { size: "small", quantity: 25 },
      { size: "medium", quantity: 40 },
      { size: "large", quantity: 35 },
      { size: "x-Large", quantity: 15 },
    ],
    sold: 90,
    isSale: false,
  },

  {
    name: "Eric Bompard",
    price: 11900,
    description: "knitted hoodie",
    category: "hoodie",
    imageUrl:
      "https://res.cloudinary.com/dtwnppsc6/image/upload/v1747118293/shopping-co/Eric_Bompard_naw399.webp",
    sizes: [
      { size: "small", quantity: 25 },
      { size: "medium", quantity: 40 },
      { size: "large", quantity: 35 },
      { size: "x-Large", quantity: 15 },
    ],
    sold: 35,
    isSale: false,
  },

  {
    name: "Philipp Plein",
    price: 10800,
    description: "Skully Gang low rise skinny jeans.",
    category: "jeans",
    imageUrl:
      "https://res.cloudinary.com/dtwnppsc6/image/upload/v1747116238/shopping-co/Philipp_Plein_o4bzpr.webp",
    sizes: [
      { size: "small", quantity: 25 },
      { size: "medium", quantity: 40 },
      { size: "large", quantity: 35 },
      { size: "x-Large", quantity: 15 },
    ],
    sold: 90,
    isSale: false,
  },

  {
    name: "Thom Browne",
    price: 32000,
    description: "Snake embroidery straight leg jeans.",
    category: "jeans",
    imageUrl:
      "https://res.cloudinary.com/dtwnppsc6/image/upload/v1747116237/shopping-co/Thom_Browne_ecnz4p.webp",
    sizes: [
      { size: "small", quantity: 25 },
      { size: "medium", quantity: 40 },
      { size: "large", quantity: 35 },
      { size: "x-Large", quantity: 15 },
    ],
    sold: 90,
    isSale: true,
    salePrice: 26000,
  },

  {
    name: "Daily Paper ",
    price: 3600,
    description: "Logo printed jeans.",
    category: "jeans",
    imageUrl:
      "https://res.cloudinary.com/dtwnppsc6/image/upload/v1747116237/shopping-co/Daily_Paper_kehmgp.webp",
    sizes: [
      { size: "small", quantity: 25 },
      { size: "medium", quantity: 40 },
      { size: "large", quantity: 35 },
      { size: "x-Large", quantity: 15 },
    ],
    sold: 90,
    isSale: false,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.CONNECTION);
    console.log("Connected to MongoDB");

    // Clear existing data (optional, but useful for development)
    await Product.deleteMany({});
    console.log("Products cleared");

    // If you are referencing reviews, you might want to clear those too
    // await Review.deleteMany({});
    // console.log('Reviews cleared');

    // Insert the seed data
    const createdProducts = await Product.insertMany(seedProducts);
    console.log("Products seeded successfully:", createdProducts);

    mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.disconnect();
  }
}

seedDatabase();
