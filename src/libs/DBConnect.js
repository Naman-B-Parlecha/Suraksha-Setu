import { prisma } from "../../prisma";

export const DBConnect = async () => {
  try {
    await prisma.$connect();
    console.log("DB Connected");
  } catch (error) {
    console.log("Error in DBConnect : ", error);
  }
};
