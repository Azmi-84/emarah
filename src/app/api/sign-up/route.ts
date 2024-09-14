import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    // Check if username already exists and is verified
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      console.log("Username already exists and is verified");
      return new Response(
        JSON.stringify({
          message: "username already exists",
          success: false,
        }),
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        console.log("Email already exists and is verified");
        return new Response(
          JSON.stringify({
            message: "Email already exists",
            success: false,
          }),
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpire = new Date(Date.now() + 3600000); // 1 hour from now
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const verifyCodeExpiry = new Date(Date.now() + 3600000); // 1 hour from now

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpire: verifyCodeExpiry,
        isVerified: false,
        isAcceptingMessages: true,
        messages: [],
      });

      await newUser.save();
    }

    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    if (!emailResponse) {
      console.log("Error sending verification email");
      return new Response(
        JSON.stringify({
          message: "Error sending verification email",
          success: false,
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        message:
          "User registered successfully. Please verify your email address",
        success: true,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user: ", error);
    return new Response(
      JSON.stringify({
        message: "Error registering user",
        success: false,
      }),
      { status: 500 }
    );
  }
}
