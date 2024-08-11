import { DBConnect } from "@/libs/DBConnect";  
import { NextResponse } from "next/server";  
import { PrismaClient } from "@prisma/client";  

export async function GET(req) {
    const prisma = new PrismaClient();
    // Extract the phone number from the URL slug  
    const { pathname } = req.nextUrl; // Get the URL path  
    const uid = pathname.split('/').pop(); // Get the last segment of the URL  
    console.log("Getting uid", uid);
    try {
      await DBConnect();
  
      const support = await prisma.propertyLoss.findMany({
        where: {
          authorId: uid,
        },
        orderBy: {
          date: 'desc',
        },
      });
  
      console.log("Support fetched successfully:", support);
  
      return NextResponse.json(support);
    } catch (error) {
      console.log("Error in GET:", error);
      return NextResponse.json({ message: "Error in GET: " + error });
    } finally {
      await prisma.$disconnect(); // Properly disconnect the Prisma client
    }
  }