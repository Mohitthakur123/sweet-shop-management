// In backend/src/services/sweetService.js

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const VALID_CATEGORIES = [
  'Nut-Based',
  'Milk-Based',
  'Vegetable-Based',
  'Chocolate',
  'Candy',
  'Pastry',
];

export class SweetService {
  async getAllSweets() {
    return await prisma.sweet.findMany();
  }

  async getSweetById(id) {
    return await prisma.sweet.findUnique({
      where: { id: id },
    });
  }
  

  async addSweet(data) {
    const name = data.name?.trim();

    // 1. Basic shape validation
    if (!name) {
      throw new Error('Sweet name is required');
    }

    if (!VALID_CATEGORIES.includes(data.category)) {
      throw new Error('Invalid category');
    }

    if (typeof data.price !== 'number' || data.price <= 0) {
      throw new Error('Price must be a positive number');
    }

    if (!Number.isInteger(data.quantity) || data.quantity < 0) {
      throw new Error('Quantity must be a non-negative integer');
    }

    // 2. Case-insensitive uniqueness check
    const existingByName = await prisma.sweet.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });

    if (existingByName) {
      throw new Error('Sweet with this name already exists');
    }

    // 3. Exact duplicate check (optional but useful)
    const exactDuplicate = await prisma.sweet.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
        category: data.category,
        price: data.price,
        quantity: data.quantity,
      },
    });

    if (exactDuplicate) {
      throw new Error('Identical sweet already exists');
    }

    // 4. Create
    return prisma.sweet.create({
      data: {
        name,
        category: data.category,
        price: data.price,
        quantity: data.quantity,
      },
    });
  }

  async updateSweet(id, updateData) {
    return await prisma.sweet.update({
      where: { id: id },
      data: updateData,
    });
  }

  async deleteSweet(id) {
    await prisma.sweet.delete({
      where: { id: id },
    });
    return true; // Indicate success
  }

  async purchaseSweet(id, quantity) {
    const sweet = await this.getSweetById(id);
    if (!sweet || sweet.quantity < quantity) {
      throw new Error("Sweet not found or insufficient stock");
    }
    return await prisma.sweet.update({
      where: { id: id },
      data: { quantity: sweet.quantity - quantity },
    });
  }

  async restockSweet(id, quantity) {
    return await prisma.sweet.update({
      where: { id: id },
      data: { quantity: { increment: quantity } }, // A more efficient way to restock
    });
  }

  async searchSweets({ name, category, minPrice, maxPrice }) {
    const where = {};
    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (category) where.category = { equals: category };
    if (minPrice) where.price = { ...where.price, gte: parseFloat(minPrice) };
    if (maxPrice) where.price = { ...where.price, lte: parseFloat(maxPrice) };
    console.log(where);
    return await prisma.sweet.findMany({ where });
  }
}