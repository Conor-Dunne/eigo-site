import prisma from "@/prisma";
import { NextResponse } from "next/server";

// GET ALL POSTS
export const GET = async () => {
    try {
      const categories = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc' ,
        },
  
      });
  
      return new NextResponse(JSON.stringify(categories, { status: 200 }));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
      );
    }
  };




// CREATE A POST
export const POST = async (req) => {
    try {
      const body = await req.json();
      const post = await prisma.post.create({
        data: { ...body },
      });
  
      return new NextResponse(JSON.stringify(post, { status: 200 }));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
      );
    }
  };