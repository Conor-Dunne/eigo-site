import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const DELETE = async (req, res) => {
  try {
    const id = req.url.split("/")[5];

    const vocab = await prisma.Vocabulary.delete({ where: { id } });
    return NextResponse.json({ message: "Success", vocab }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

//GET A SINGLE VOCAB

export const GET = async (req) => {
  const id = req.url.split("/")[5];

  try {
    const vocab = await prisma.Vocabulary.findFirst({ where: { id } });

    return new NextResponse(JSON.stringify(vocab, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
