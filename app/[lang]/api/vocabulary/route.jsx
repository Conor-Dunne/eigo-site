import prisma from "@/prisma";
import { NextResponse } from "next/server";

// ADD VOCABULARY
export const POST = async (req) => {
  try {
    const body = await req.json();
    const createdEntries = await prisma.Vocabulary.createMany({
      data: body,
    });

    console.log('Entries added successfully:', createdEntries);

    // Return a success response
    return new NextResponse(200, createdEntries);
  } catch (error) {
    console.error('Error adding entries:', error);

    // Return an error response
    return new NextResponse(500, { message: "Something went wrong!" });
  }
};
