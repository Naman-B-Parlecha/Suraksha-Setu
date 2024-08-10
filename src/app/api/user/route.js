import { DBConnect } from "@/libs/DBConnect";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
export async function POST(req, res) {
  const prisma = new PrismaClient();
  try {
    await DBConnect();
    const { phone } = await req.json();

    console.log("phone : ", phone);
    const extUser = prisma.user.findFirst({
      where: {
        phone: phone,
      },
    });
    if (extUser) {
      return NextResponse.json({ message: "User already exists" });
    }

    console.log("Creating user with phone : ", phone);

    const user = prisma.user.create({
      data: {
        phone,
      },
    });

    console.log("User created successfully", user);

    return NextResponse.json({ data: user });
  } catch (error) {
    console.log("Error in POST : ", error);
    return NextResponse.json({ message: "Error in POST : " + error });
  }
}
