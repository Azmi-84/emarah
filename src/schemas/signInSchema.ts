import {z} from "zod";

export const identityValidation = z
.string()
.min(3, "username must be at least 3 characters")
.regex(/^[a-zA-Z0-9_]+$/, "username must only contain alphanumeric characters and underscores");

export const signInSchema = z.object({
    identifier: identityValidation,
    password: z.string().min(6, {message: "Password must be at least 6 characters long"})
})