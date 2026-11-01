import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Sample items so the store isn't empty. Replace with real ones in Prisma Studio.
const products = [
  { name: "Ankara Wrap Dress", slug: "ankara-wrap-dress", category: "Outfits", price: 28000, description: "A bright wrap dress with a flattering tie waist. Easy to dress up or down." },
  { name: "Linen Two-Piece Set", slug: "linen-two-piece-set", category: "Outfits", price: 35000, description: "Soft, breathable linen top and trousers. Perfect for warm days." },
  { name: "Satin Evening Gown", slug: "satin-evening-gown", category: "Outfits", price: 52000, description: "A floor-length satin gown with a smooth drape for weddings and events." },
  { name: "Beaded Statement Necklace", slug: "beaded-statement-necklace", category: "Accessories", price: 9500, description: "Handmade beaded necklace that lifts any plain outfit." },
  { name: "Leather Crossbody Bag", slug: "leather-crossbody-bag", category: "Accessories", price: 24000, description: "A compact bag with an adjustable strap, big enough for your phone and essentials." },
  { name: "Gold-Tone Hoop Earrings", slug: "gold-tone-hoop-earrings", category: "Accessories", price: 6000, description: "Lightweight hoops you can wear all day." },
];

async function main() {
  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: { ...p, imageUrl: `https://picsum.photos/seed/${p.slug}/600/750` },
    });
  }
  console.log("Seeded", products.length, "products");
}

main().finally(() => prisma.$disconnect());
