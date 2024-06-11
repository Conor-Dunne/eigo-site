import prisma from "@/prisma";
import { NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (req, { params }) => {
    const { id } = params;

  
    try {
      const post = await prisma.post.update({
        where: { id },
        data: { views: { increment: 1 } },
        include: { keyWords: true },
      });
  
      return new NextResponse(JSON.stringify(post, { status: 200 }));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
      );
    }
  };


  // EDIT A POST

  export const PUT = async (req, res) => {
    try {
      const { id, title, img, desc, audio, desc_jp, published} = await req.json(); 
      const post = await prisma.post.update({
        data: {title, img, desc, desc_jp, audio, published },
        where: { id },
      });
  
      return new NextResponse(JSON.stringify(post, { status: 200 }));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
      );
    }
  };