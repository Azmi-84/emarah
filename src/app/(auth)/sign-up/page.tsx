"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isCheckingPassword, setIsCheckingPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debounced = useDebounceCallback(setUsername, 400);
  const debouncedPassword = useDebounceCallback(setPassword, 400);
  const { toast } = useToast();
  const router = useRouter();

  const register = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage("");

        try {
          const response = await axios.get<ApiResponse>(
            `/api/check-username-unique?username=${username}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "An error occurred"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);

  useEffect(() => {
    const checkPasswordStrength = async () => {
      if (password) {
        setIsCheckingPassword(true);
        setPasswordMessage("");

        try {
          const response = await axios.get<ApiResponse>(
            `/api/check-password?password=${password}`
          );
          setPasswordMessage(response.data.message);
        } catch (error) {
          console.error("Error checking password strength:", error);
          const axiosError = error as AxiosError<ApiResponse>;
          setPasswordMessage(
            axiosError.response?.data.message ?? "An error occurred"
          );
        } finally {
          setIsCheckingPassword(false);
        }
      }
    };
    checkPasswordStrength();
  }, [password]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.replace(`/verify/${data.username}`);
    } catch (error) {
      console.error("Error in sign up", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Sign Up Failed",
        description: errorMessage ?? "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="section-title text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Emarah
          </h1>
          <p className="mb-4 text-[#010D3E]">
            Sign up to start your anonymous adventure
          </p>
        </div>
        <Form {...register}>
          <form
            className="space-y-6"
            onSubmit={register.handleSubmit(onSubmit)}
          >
            <FormField
              name="username"
              control={register.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                    />
                  </FormControl>
                  {isCheckingUsername && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <p
                    className={`text-sm ${
                      usernameMessage === "Username is unique"
                        ? "text-lime-500"
                        : usernameMessage.includes("error")
                        ? "text-red-500"
                        : "text-orange-500"
                    }`}
                  >
                    {usernameMessage}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={register.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="e-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={register.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="password"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debouncedPassword(e.target.value);
                      }}
                    />
                  </FormControl>
                  {isCheckingPassword && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <p
                    className={`text-sm ${
                      passwordMessage === "Password is valid and unique"
                        ? "text-lime-500"
                        : passwordMessage.includes("error")
                        ? "text-red-500"
                        : "text-orange-500"
                    }`}
                  >
                    {passwordMessage}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={
                isSubmitting || isCheckingUsername || isCheckingPassword
              }
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                  wait...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
        <div>
          <p className="text-sm text-center text-[#010D3E]">
            Already have an account?{" "}
            <Link
              className="text-orange-600 hover:text-orange-400"
              href="/sign-in"
            >
              Sign in here!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
