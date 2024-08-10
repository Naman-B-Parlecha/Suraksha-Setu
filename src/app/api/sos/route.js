import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { DBConnect } from "@/libs/DBConnect";

const prisma = new PrismaClient();

export async function POST(req) {
  const data = await req.json();
  const { message, latitude, longitude } = data;

  try {
    await DBConnect();

    const sos = await prisma.sos.create({
      data: {
        message: message,
        latitude: latitude,
        longitude: longitude,
      },
    });

    return NextResponse.json({ message: "SOS sent successfully!" });
  } catch (error) {
    console.log("Error in POST:", error);
    return NextResponse.json({ message: "Error in POST: " + error });
  }
}
