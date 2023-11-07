//@ts-nocheck
import NextAuth from "next-auth/next";
import prisma from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                role: {  // Add this section for role selection
                    label: "Role",
                    type: "select",
                    options: ["USER", "ADMIN"],  // Options should match your enum values
                },
            },
            async authorize(credentials) {
                // Check to see if email, password, and role are provided
                if (!credentials.email || !credentials.password || !credentials.role) {
                    throw new Error('Please enter an email, password, and select a role')
                }

                // Find a user by email using Prisma
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                // If no user was found
                if (!user || !user.hashedPassword) {
                    throw new Error('No user found')
                }

                // Check if the provided password matches the hashed password in the database
                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

                // If the password does not match
                if (!passwordMatch) {
                    throw new Error('Incorrect password')
                }

                // Check if the provided role is valid (USER or ADMIN)
                if (credentials.role !== "USER" && credentials.role !== "ADMIN") {
                    throw new Error('Invalid role selection')
                }

                // Assign the selected role to the user
                user.role = credentials.role;

                return user;
            },
        }),  
    ],
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}