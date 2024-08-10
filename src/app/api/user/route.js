import { DBConnect } from "@/libs/DBConnect";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req) {
  const prisma = new PrismaClient();
  try {
    await DBConnect();

    // Parse the request body once and store it in a variable
    const body = await req.json();
    console.log("data in backend =", body);

    const { phone } = body;
    console.log("phone", phone);

    // Use `await` to ensure the database operations are completed before proceeding
    const extUser = await prisma.user.findFirst({
      where: {
        phone: phone,
      },
    });

    if (extUser) {
      return NextResponse.json(user);
    }

    console.log("extUser", extUser);

    const user = await prisma.user.create({
      data: {
        phone,
        profileImage: "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
      },
    });

    console.log("User created successfully", user);

    return NextResponse.json(user);
  } catch (error) {
    console.log("Error in POST:", error);
    return NextResponse.json({ message: "Error in POST: " + error });
  } finally {
    await prisma.$disconnect(); // Properly disconnect the Prisma client
  }
}
