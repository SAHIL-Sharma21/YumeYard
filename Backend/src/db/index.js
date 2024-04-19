// // //connecting todb here
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        }
    }
});

//making async function to conect to db
const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log(`\n Postgresql connected! DB Host.`);
    } catch (error) {
        console.log('Postgresql connection failed:', error);
        process.exit(1);
    }
}

export default connectDB;
