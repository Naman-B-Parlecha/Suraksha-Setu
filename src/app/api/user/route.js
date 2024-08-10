import { DBConnect } from "@/libs/DBConnect";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    await DBConnect();
    return NextResponse.json({ message: "Hello" });
  } catch (error) {
    console.log("Error in POST : ", error);
  }
}
