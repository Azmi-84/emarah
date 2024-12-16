"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { messageValidation } from '@/schemas/messageSchema';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Separator } from '@radix-ui/react-separator';
import { motion } from 'framer-motion';

const PublicPage = () => {
  const { username } = useParams<{ username: string }>();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestedMessages, setSuggestedMessages] = useState([
    { message: "What's your favorite movie?" },
    { message: "Do you have any pets?" },
    { message: "What's your dream job?" }
  ]);

  const register = useForm({
    resolver: zodResolver(messageValidation),
    defaultValues: {
      content: ""
    }
  });

  const onSendMessages = async (data: z.infer<typeof messageValidation>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/send-messages", {
        username: decodeURIComponent(username),
        content: data.content
      });

      if (response.data.success) {
        toast({
          title: "Message Sent",
          description: response.data.message,
          variant: "default"
        });
      } else {
        toast({
          title: `${username} doesn't receive messages`,
          description: response.data.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "An error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSuggestMessages = async () => {
    try {
      const response = await axios.post("/api/chat");
      const messages = response.data.split('||').map((msg: string) => ({ message: msg.trim() }));
      setSuggestedMessages(messages);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch suggestions.",
        variant: "destructive"
      });
    }
  };

  const fillMessageField = (message: string) => {
    register.setValue('content', message);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='flex justify-center items-center overflow-hidden min-h-screen bg-gradient-to-b from-white to-[#D2DCFF]'
    >
      <div className="container">
        <motion.div
          className='section-heading text-center mb-6'
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className='section-title text-2xl font-bold'>Public Profile Link</h2>
          <p className='section-description text-gray-600'>Send your message anonymously</p>
        </motion.div>

        <Form {...register}>
          <form className="space-y-6" onSubmit={register.handleSubmit(onSendMessages)}>
            <FormField
              name="content"
              control={register.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Send anonymous message to {username}</FormLabel>
                  <FormControl>
                    <Input placeholder="Write your message here" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="text-white rounded py-2 px-4">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                </>
              ) : (
                'Send It'
              )}
            </Button>
          </form>
        </Form>

        <div className="flex flex-col items-center justify-center mt-8">
          <Button onClick={onSuggestMessages} className="text-white rounded py-2 px-4 mb-4">
            Suggest Messages
          </Button>

          <motion.div
            className="flex flex-col text-center justify-center items-center gap-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {suggestedMessages.map((msg, index) => (
              <motion.div
                key={index}
                className="bg-gray-200 dark:bg-gray-700 p-4 rounded cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200 ease-in-out"
                onClick={() => fillMessageField(msg.message)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {msg.message}
                {index < suggestedMessages.length - 1 && <Separator orientation="horizontal" className="my-2" />}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PublicPage;
