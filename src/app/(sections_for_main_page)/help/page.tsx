"use client";

import Footer from "@/sections/Footer";
import Header from "@/sections/Header";
import React, { useState, useEffect, FormEvent, useRef } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

type Message = {
  sender: "user" | "ai";
  text: string;
};

const Help = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
    document.body.style.filter = !isChatOpen ? "blur(5px)" : "none";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setMessages((prev) => [...prev, { sender: "user", text: trimmedInput }]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("/api/help-chat", { message: trimmedInput });
      const { message } = response.data;
      setMessages((prev) => [...prev, { sender: "ai", text: message }]);
    } catch (error) {
      const errorMessage = axios.isAxiosError(error) && error.response?.data?.error
        ? error.response.data.error
        : "An error occurred. Please try again.";
      toast({ title: "Error", description: errorMessage });
      setMessages((prev) => [...prev, { sender: "ai", text: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

return (
  <>
    <Header />
    <Footer />
  </>
)
};

export default Help;
