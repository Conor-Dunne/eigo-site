import prisma from "@/prisma"

export const connectToDatabase = async() => {
    try {
        await prisma.$connect();
    } catch (error) {
        console.log(error)
        throw new Error("Can't connect to database")
    }
}