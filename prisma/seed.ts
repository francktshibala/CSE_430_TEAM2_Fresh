import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Seed users
  const [jane, john, sarah] = await Promise.all([
    prisma.user.create({
      data: {
        email: "jane@example.com",
        name: "Jane Doe",
        password:
          "$2y$12$pnmG8xoVesJ0XVv6ON6B6uwQX1/NpUq7iGLjTD9fWo5Uw4774Lxo2", //hashedpassword123
        accountType: "SELLER",
      },
    }),
    prisma.user.create({
      data: {
        email: "john@example.com",
        name: "John Smith",
        password:
          "$2y$12$yrmGesWrKgkF6q3x4lOjKebZo/rqakewJFLCXVE/v1CYUcFKQPC.a", //hashedpassword456
        accountType: "SELLER",
      },
    }),
    prisma.user.create({
      data: {
        email: "sarah@example.com",
        name: "Sarah Jones",
        password:
          "$2y$12$4JBigxGbT9EWNVUF2CwL3uqirkeD0rLdqA561VaRxRKmDorkmbmly", //hashedpassword789
        accountType: "SELLER",
      },
    }),
  ]);

const [emily, michael, olivia] = await Promise.all([
  prisma.user.create({
    data: {
      email: "user@example.com",
      name: "Emily Clark",
      password: "$2y$12$0n3gD.ifW27wKcV1TYu07O9YuOaXFiYJN5nYHmOkx4zqpdhuC7m3q", // "basicpassword123"
      accountType: "BASIC",
    },
  }),
  prisma.user.create({
    data: {
      email: "user2@example.com",
      name: "Michael Nguyen",
      password: "$2y$12$0n3gD.ifW27wKcV1TYu07O9YuOaXFiYJN5nYHmOkx4zqpdhuC7m3q", // same hash
      accountType: "BASIC",
    },
  }),
  prisma.user.create({
    data: {
      email: "user3@example.com",
      name: "Olivia Martinez",
      password: "$2y$12$0n3gD.ifW27wKcV1TYu07O9YuOaXFiYJN5nYHmOkx4zqpdhuC7m3q",
      accountType: "BASIC",
    },
  }),
]);

const basicUsers = [emily, michael, olivia];

  // Seed categories
  const categoryNames = [
    "Ceramics & Pottery",
    "Wood Crafts",
    "Handmade Jewelry",
    "Textile Arts",
    "Home Decor",
    "Paintings",
    "Glass Art",
    "Leather Goods",
  ];

  const categories = await Promise.all(
    categoryNames.map((name) => prisma.category.create({ data: { name } }))
  );

  // Seed products
  const productsData = [
    {
      name: "Handcrafted Ceramic Bowl Set",
      description:
        "This ceramic set is made from high-quality materials, and each item is shaped and glazed by hand, making every piece one of a kind.",
      price: 49.99,
      image: "/ceramic-bowls.jpg",
      userId: jane.id,
      categoryName: "Ceramics & Pottery",
    },
    {
      name: "Hand Carved Wooden Animals",
      description:
        "Celebrate the beauty of nature and craftsmanship with this exquisite hand-carved wooden animal set.",
      price: 35.21,
      image: "/wood-animals.jpg",
      userId: john.id,
      categoryName: "Wood Crafts",
    },
    {
      name: "Silver Jewelry Collection",
      description:
        "Each piece is crafted from high-quality 925 sterling silver.",
      price: 156.99,
      image: "/silver-jewelry.jpg",
      userId: sarah.id,
      categoryName: "Handmade Jewelry",
    },
    {
      name: "Handwoven Wool Scarf",
      description: "Keep warm and stylish with this 100% wool handwoven scarf.",
      price: 29.99,
      image:
        "https://www.lambontheloom.com/uploads/3/9/6/4/39645449/s506511475636059849_p405_i100_w705.jpeg",
      userId: jane.id,
      categoryName: "Textile Arts",
    },
    {
      name: "Macrame Wall Hanging",
      description: "Perfect boho decor piece for your living space.",
      price: 45.0,
      image: "https://i.etsystatic.com/12236165/r/il/166c5b/1954094120/il_1588xN.1954094120_lkrp.jpg",
      userId: john.id,
      categoryName: "Home Decor",
    },
    {
      name: "Acrylic Landscape Painting",
      description: "Vibrant landscape painted on stretched canvas.",
      price: 120.0,
      image: "https://i.etsystatic.com/52460318/r/il/6a3e2f/6512660891/il_1588xN.6512660891_eihc.jpg",
      userId: sarah.id,
      categoryName: "Paintings",
    },
    {
      name: "Blown Glass Vase",
      description: "Elegant hand-blown glass vase with a swirl pattern.",
      price: 65.5,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmvrqD2av5IzZckbZDU-tUs1p6u2rN0umt3dGRE-WwXyTYASJW6YjsfGdqvsFaDN2hwk0&usqp=CAU",
      userId: john.id,
      categoryName: "Glass Art",
    },
    {
      name: "Leather Messenger Bag",
      description: "Durable and stylish leather bag for daily use.",
      price: 110.0,
      image: "https://buffalojackson.com/cdn/shop/files/roosevelt2-leather-messenger-bag-dark-briar-2_800x.jpg?v=1686950127",
      userId: jane.id,
      categoryName: "Leather Goods",
    },
    {
      name: "Wooden Jewelry Box",
      description: "Handcrafted wooden box with intricate carvings.",
      price: 40.0,
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRVqBwYauyizWxJJTmXG2eBWtTWlYCMKecIvJMZEaopEV6pybjpR4oH4F8Mi0e8jkRYErV3XaVyLFn8woM6Co7kt3bnu1gqtaWZW1tcahw&usqp=CAc",
      userId: sarah.id,
      categoryName: "Wood Crafts",
    },
    {
      name: "Handmade Beaded Necklace",
      description: "Colorful beaded necklace with tribal patterns.",
      price: 22.0,
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRKqVQiJGMlZFVyE4tt5y8Qa3arcJwcsXjR9f-Ml3hX5-M6iYxvPBkvYCZJ2OF1FNQlGitQGOk5sTFg1SpvYjW0bqhOjru5hAoYUcRUVpy82PT8nfOZ_Y8M&usqp=CAc",
      userId: john.id,
      categoryName: "Handmade Jewelry",
    },
    {
      name: "Rustic Clay Mug Set",
      description: "Earth-toned mugs perfect for coffee lovers.",
      price: 38.5,
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQAvzISuspoDOW3hA8lZx8TP5MJ2ZSos_30iS757e_Z-AomPz6eiWDIuAJpkEu-qWTwewodkKw71EseUKHc48hRbIa4W7rw5LLY1UUCakQ&usqp=CAc",
      userId: jane.id,
      categoryName: "Ceramics & Pottery",
    },
    {
      name: "Stained Glass Suncatcher",
      description: "Colorful suncatcher that lights up your window.",
      price: 32.75,
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR8HWiTgBOULkxWRPcfc2WJhBSO5AXhsFZynlPIMlnXLym3z4NJVWyitooRiGaeMptZvIgRCS0I1Evmwq6BpnIdi9lx5YTpdXUF67iftBCu&usqp=CAc",
      userId: sarah.id,
      categoryName: "Glass Art",
    },
    {
      name: "Hand-Stitched Leather Wallet",
      description: "Compact wallet with hand-stitched edges.",
      price: 28.0,
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ6QG_0_lcM_OICyhhLK_I6jlhF10IhYys9tKu8FwaA8b_incXgKj6U93_Ehtv8RtxhkVikiKADu6xHksQwvdSkeh4YaGofaSnR1NQuE_OC4YdSYVTGQaiVig&usqp=CAc",
      userId: john.id,
      categoryName: "Leather Goods",
    },
  ];

  const products = [];
  for (const prod of productsData) {
const category = categories.find((c) => c.name === prod.categoryName);
if (!category) {
  throw new Error(
    `Category '${prod.categoryName}' not found for product '${prod.name}'`
  );
}    const createdProduct = await prisma.product.create({
      data: {
        name: prod.name,
        description: prod.description,
        price: prod.price,
        image: prod.image,
        userId: prod.userId,
        categoryId: category.id,
      },
    });
    products.push(createdProduct);
  }

  // Seed reviews (3 per product)
  const reviewComments = [
    "Absolutely love this!",
    "Exceeded my expectations.",
    "Great quality for the price.",
    "Will definitely buy again.",
    "A true piece of art.",
    "Beautiful craftsmanship.",
    "Exactly what I was looking for.",
    "Fast shipping and great service.",
    "Highly recommend this seller.",
  ];

  const reviews = [];
  for (const product of products) {
    for (let i = 0; i < 3; i++) {
      reviews.push({
        rating: Math.floor(Math.random() * 2) + 4, // rating between 4-5
        comment:
          reviewComments[Math.floor(Math.random() * reviewComments.length)],
        userId: basicUsers[i % basicUsers.length].id,
        productId: product.id,
      });
    }
  }

  await prisma.review.createMany({ data: reviews });

  console.log("Seed data created!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
