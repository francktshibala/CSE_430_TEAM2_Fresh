import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getProductById(id: number) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true
          }
        },
        category: {
          select: {
            name: true
          }
        },
        reviews: {
          include: {
            user: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });
    
    return product ? [product] : [];
  } catch (error) {
    console.error('Error fetching product:', error);
    return [];
  }
}

export async function getUserById(id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    
    return user ? [user] : [];
  } catch (error) {
    console.error('Error fetching user:', error);
    return [];
  }
}

export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        user: {
          select: {
            name: true
          }
        },
        category: {
          select: {
            name: true
          }
        },
        reviews: true
      }
    });
    
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}