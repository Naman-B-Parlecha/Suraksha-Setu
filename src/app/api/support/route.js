import { DBConnect } from "@/libs/DBConnect";  
import { NextResponse } from "next/server";  
import { PrismaClient } from "@prisma/client";  

export async function POST(req) {
  const prisma = new PrismaClient();

  try {
    await DBConnect();

    // Parse the request body to get the updated data
    const updatedData = await req.json();
    console.log("Updated data:", updatedData);

    const support = await prisma.propertyLoss.create({
      data: {
        name: updatedData.full_name,
        cost: updatedData.losses,
        description: updatedData.property,
        location: updatedData.address,
        date: updatedData.time,
        isVerified: false,
        isClaimed: false,
        authorId: updatedData.authorId,
      }
    });

    console.log("Support created successfully:", support);

    return NextResponse.json(support);
  } catch (error) {
    console.log("Error in POST:", error);
    return NextResponse.json({ message: "Error in POST: " + error });
  } finally {
    await prisma.$disconnect(); // Properly disconnect the Prisma client
  }
}