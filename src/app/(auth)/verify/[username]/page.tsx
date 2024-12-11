"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

import InputOTPForm from "@/components/InputOTPForm";
import { useToast } from "@/components/ui/use-toast";
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import * as z from "zod";

const VerifyAccountPage = () => {
  const router = useRouter();
  const { username } = useParams<{ username: string }>();
  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post("/api/verify-code", {
        username: decodeURIComponent(username),
        code: data.code,
      });

      toast({
        title: "Success",
        description: response.data.message,
      });
      router.replace("/sign-in");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Verification Failed",
        description: axiosError.response?.data.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify Your Account
          </h1>
          <p className="mb-4 font-medium">User Verification</p>
        </div>
        <InputOTPForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default VerifyAccountPage;
