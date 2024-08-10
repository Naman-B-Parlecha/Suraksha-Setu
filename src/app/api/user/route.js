import { DBConnect } from "@/libs/DBConnect";
import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma";

export async function POST(req, res) {
  try {
    await DBConnect();
    
    const { phone } = req.body;

    const extUser = prisma.user.findUnique({
      where: { phone },
    });
    if (extUser) {
      return NextResponse.json({ message: "User already exists" });
    }

    const user = prisma.user.create({
      data: {
        phone,
      },
    });
    
    return NextResponse.json({ data: user });
  } catch (error) {
    console.log("Error in POST : ", error);
  }
}
