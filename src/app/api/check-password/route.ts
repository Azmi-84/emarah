import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { passwordValidation } from "@/schemas/signUpSchema";
import bcrypt from "bcryptjs";

const PasswordQuerySchema = z.object({
  password: passwordValidation
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get("password");

    if (!password) {
      return new Response(JSON.stringify({
        success: false,
        message: "Password is required",
      }), { status: 400 });
    }

    console.log("Received password query:", password);

    // Validate the query parameters using Zod
    PasswordQuerySchema.parse({ password });

    // Check if the password already exists
    const existingUser = await UserModel.findOne({});
    if (existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (isMatch) {
        return new Response(JSON.stringify({
          success: false,
          message: "Password already exists",
        }), { status: 400 });
      }
    }

    // The password strength is already validated by the schema
    return new Response(JSON.stringify({
      success: true,
      message: "Password is valid and unique",
    }), { status: 200 });

  } catch (error) {
    console.error("Error checking password: ", error);

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({
        success: false,
        message: error.errors,
      }), { status: 400 });
    }

    return new Response(JSON.stringify({
      success: false,
      message: "Internal server error",
    }), { status: 500 });
  }
}
