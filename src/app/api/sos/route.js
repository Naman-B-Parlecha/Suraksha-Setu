import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { DBConnect } from "@/libs/DBConnect";
import nodemailer from "nodemailer";

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

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "darshilmahraur93@gmail.com",
        pass: process.env.SECRET,
      },
    });

    const mailOptions = {
      from: '"Suraksha Setu" <darshilmahraur93@gmail.com>',
      to: "darshilmahraur3@gmail.com",
      subject: `🚨 SOS Alert! 🚨`,
      text: `${message}`,
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border: 1px solid #f44336; border-radius: 10px; background-color: #ffebee;">
        <h1 style="color: #d32f2f; text-align: center;">🚨 SOS Alert 🚨</h1>
        <p style="font-size: 18px; line-height: 1.6; color: #d32f2f;">
          <strong style="font-size: 24px;">Urgent Help Needed!</strong>
        </p>
        <p style="font-size: 16px; color: #444; line-height: 1.6; padding: 10px 0;">
          ${message}
        </p>
        <div style="background-color: #fff; border: 1px solid #d32f2f; border-radius: 8px; padding: 15px; margin: 20px 0;">
          <h2 style="color: #d32f2f; font-size: 20px; margin: 0 0 10px;">Current Location</h2>
          <p style="font-size: 16px; color: #333; margin: 5px 0;">
            <strong>Latitude:</strong> <span style="color: #d32f2f;">${latitude}</span>
          </p>
          <p style="font-size: 16px; color: #333; margin: 5px 0;">
            <strong>Longitude:</strong> <span style="color: #d32f2f;">${longitude}</span>
          </p>
        </div>
        <p style="font-size: 16px; color: #444; text-align: center; margin-top: 20px;">
          Please respond immediately if you can assist.
        </p>
        <div style="text-align: center; margin-top: 20px;">
          <a href="mailto:darshilmahraur93@gmail.com" style="display: inline-block; padding: 10px 20px; background-color: #d32f2f; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Respond Now
          </a>
        </div>
      </div>
      `,
    };
    

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "SOS sent successfully!" });
  } catch (error) {
    console.log("Error in POST:", error);
    return NextResponse.json({ message: "Error in POST: " + error });
  }
}
