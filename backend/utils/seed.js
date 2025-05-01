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
    category: "T-shirts",
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
    category: "T-shirts",
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
    category: "T-shirts",
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
