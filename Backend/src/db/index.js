import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

export const connectDB = async () => {
  let currentTry = 0;
  
  while (currentTry < MAX_RETRIES) {
    try {
      await prisma.$connect();
      console.log('Successfully connected to database');
      return prisma;
    } catch (error) {
      currentTry++;
      console.log(`Failed to connect to database (attempt ${currentTry}/${MAX_RETRIES})`);
      if (currentTry === MAX_RETRIES) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
};