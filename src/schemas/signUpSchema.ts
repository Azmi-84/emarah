import { Content } from "next/font/google";
import { z } from "zod";
const nsfwkeywords = [
    "adult",
    "anal",
    "ass",
    "bitch",
    "blowjob",
    "boobs",
    "bondage",
    "brothel",
    "bukkake",
    "camgirl",
    "camming",
    "child",
    "clit",
    "clitoris",
    "cock",
    "cum",
    "cumming",
    "dick",
    "dildo",
    "drug",
    "drugs",
    "ejaculate",
    "ejaculation",
    "erection",
    "erotic",
    "escort",
    "explicit",
    "facial",
    "fap",
    "fetish",
    "fingering",
    "fisting",
    "fuck",
    "fucking",
    "gangbang",
    "gore",
    "handjob",
    "hardcore",
    "hentai",
    "hooker",
    "incest",
    "jailbait",
    "kink",
    "lolita",
    "masturbation",
    "milf",
    "molest",
    "molestation",
    "naked",
    "nude",
    "nudity",
    "oral",
    "orgasm",
    "pedo",
    "pedophile",
    "penis",
    "piss",
    "porn",
    "pornography",
    "prostitute",
    "pussy",
    "rape",
    "rapist",
    "rimjob",
    "scat",
    "sex",
    "sexual",
    "slut",
    "snuff",
    "strip",
    "stripper",
    "taboo",
    "teen",
    "threesome",
    "tit",
    "tits",
    "underage",
    "vagina",
    "voyeur",
    "whore",
    "xxx"
];

const isNsfw = (content: string) => {
    const lowercaseContent = content.toLowerCase()
    return nsfwkeywords.some(keyword => lowercaseContent.includes(keyword))
}

export const passwordValidation = z.
string()
.min(8, { message: "Password must be at least 6 characters long" })
.max(128, { message:"Password must be no more than 128 characters long" })
.regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
.regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
.regex(/[0-9]/, { message: "Password must contain at least one number" })
// .regex(/[@$!%*?&#]/, { message: "Password must contain at least one special character" })

export const usernameValidation = z
.string()
.min(3, "username must be at least 3 characters")
.refine(content => !isNsfw(content), {message: "username contains nsfw content"})

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "invalid email address"}),
    password: passwordValidation
})