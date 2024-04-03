//@ts-nocheck
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from 'bcrypt'


export const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                // role: {  // Add this section for role selection
                //     label: "Role",
                //     type: "select",
                //     options: ["USER", "ADMIN"],  // Options should match your enum values
                // },
            },
            async authorize(credentials) {
                // Check to see if email, password, and role are provided
                if (!credentials.email || !credentials.password) {
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

                console.log(user)


                return user;
            },
        }),  
    ],
    // secret: process.env.JWT_SECRET,
    // session: {
    //     strategy: "jwt",
    // },
    // debug: process.env.NODE_ENV === "development",
}