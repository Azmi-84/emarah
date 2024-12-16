// Updated Dashboard with Modern UI and Framer Motion Animations

"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Message, User } from "@/model/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Switch } from "@nextui-org/switch";
import { Separator } from "@/components/ui/separator";
import { Loader2, RefreshCcw } from "lucide-react";
import MessageCard from "@/components/MessageCard";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });
  const { register, watch, setValue } = form;
  const acceptMessage = watch("acceptMessage");

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const fetchAcceptMessages = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessage", response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "Failed to fetch accept messages",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [setValue, toast]);

  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true);
    setIsSwitchLoading(false);
    try {
      const response = await axios.get<ApiResponse>("/api/get-messages");
      setMessages(response.data.messages || []);
      if (refresh) {
        toast({
          title: "Refreshed messages",
          description: "Showing latest messages",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "Failed to fetch messages",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsSwitchLoading(false);
    }
  }, [setMessages, toast]);

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessages();
  }, [session, setValue, fetchAcceptMessages, fetchMessages]);

  const handleSwitchChange = async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessage: !acceptMessage,
      });
      setValue("acceptMessage", !acceptMessage);
      toast({
        title: response.data.message,
        description: "Accept messages status updated",
        variant: "default",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "Failed to update accept messages",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  };

  const [profileUrl, setProfileUrl] = useState<string>("");
  const { username } = (session?.user as User) || "";

  useEffect(() => {
    if (typeof window !== "undefined" && username) {
      const baseUrl = `${window.location.protocol}//${window.location.host}/publicpage/`;
      setProfileUrl(`${baseUrl}${username}`);
    }
  }, [username]);

  const copyToClipboard = () => {
    if (profileUrl) navigator.clipboard.writeText(profileUrl);
    toast({
      title: "Copied",
      description: "Profile link copied to clipboard",
      variant: "default",
    });
  };

  if (!session || !session.user) {
    return <div>Please log in</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen p-6 bg-blue-50 w-full shadow-md"
    >
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-center">
        Dashboard
      </h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 tracking-tight text-[#010D3E]">
          Copy your unique link
        </h2>
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="w-full p-3 rounded-lg border border-gray-300 mr-4 text-[#010D3E]"
          />
          <Button onClick={copyToClipboard} className="py-3 px-6">
            Copy
          </Button>
        </motion.div>
      </div>

      <div className="mb-6 flex items-center">
        <Switch
          {...register("acceptMessage")}
          checked={acceptMessage}
          onChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2 text-lg text-[#010D3E]">
          Accept Messages: {acceptMessage ? "ON" : "OFF"}
        </span>
      </div>

      <Separator className="my-6" />

      <div className="flex justify-items-start mb-6">
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            fetchMessages(true);
          }}
          className="py-3 px-6"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <RefreshCcw className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {messages.length > 0 ? (
          messages.map((message) => (
            <motion.div
              key={message._id as string}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <MessageCard
                message={message}
                onMessageDelete={handleDeleteMessage}
              />
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-600">No messages to display</p>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;
