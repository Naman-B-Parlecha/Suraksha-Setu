import { DBConnect } from "../../../../libs/DBConnect";  
import { NextResponse } from "next/server";  
import { PrismaClient } from "@prisma/client";  

export async function GET(req) {  
    const prisma = new PrismaClient();  
    
    // Extract the phone number from the URL slug  
    const { pathname } = req.nextUrl; // Get the URL path  
    const phone = pathname.split('/').pop(); // Get the last segment of the URL  
    console.log("Getting phone", phone);
    try {  
      await DBConnect();  

      // Use `await` to ensure the database operations are completed before proceeding  
      const user = await prisma.user.findFirst({  
        where: {  
          phone: phone,  
        },  
      });  

      return NextResponse.json(user);  
    } catch (error) {  
      console.log("Error in GET:", error);  
      return NextResponse.json({ message: "Error in GET: " + error });  
    } finally {  
      await prisma.$disconnect(); // Properly disconnect the Prisma client  
    }  
}

export async function POST(req) {
    const prisma = new PrismaClient();
  
    try {
      await DBConnect();
  
      // Extract the phone number from the URL slug
      const { pathname } = req.nextUrl;
      const phone = pathname.split('/').pop();
      console.log("Updating phone", phone);
  
      // Parse the request body to get the updated data
      const updatedData = await req.json();
      console.log("Updated data:", updatedData);
  
      // Find the user by phone and update their details
      const updatedUser = await prisma.user.update({
        where: {
          phone: phone,
        },
        data: updatedData, // Update the user with the provided data
      });
  
      console.log("User updated successfully:", updatedUser);
  
      return NextResponse.json(updatedUser);
    } catch (error) {
      console.log("Error in POST:", error);
      return NextResponse.json({ message: "Error in POST: " + error });
    } finally {
      await prisma.$disconnect(); // Properly disconnect the Prisma client
    }
  }