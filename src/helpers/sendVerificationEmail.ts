import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmails";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verificationCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'https://localhost:3000/',
            to: email,
            subject: "EMARAH | Verification Email",
            react: VerificationEmail({ username, verificationCode }),
        });
        return {
            success: true,
            message: "Verification email sent",
            data: null,
            error: null,
        };
    } catch (error) {
        console.error("Error sending verification email", error);
        return {
            success: false,
            message: "Failed to send verification email",
            data: null,
            error: error,
        };
    }
}
