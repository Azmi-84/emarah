import * as React from 'react';
import { Html, Head, Body, Section, Row, Text, Button, Img, Container, Tailwind } from "@react-email/components";

interface VerificationEmailProps {
    username: string;
    verificationCode: string;
}

export default function VerificationEmail({ username, verificationCode }: VerificationEmailProps) {
    return (
        <Html lang="en" dir='ltr'>
            <Head>
                <style>
                    {`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');`}
                </style>
            </Head>
            <Body className='bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-24 overflow-x-clip'>
                <div className='container'>
                    <div className='max-w-[540px] mx-auto'>
                        <div className='flex justify-center'>
                            <div className='text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight'>Hello {username}</div>
                        </div>
                        <p className='text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5'>Thank you for signing up with us. Please use the following code to verify your email address.</p>

                        <h2 className='text-center text-3xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-5'>Verification Code: {verificationCode}</h2>
                        
                        <p className='text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5'>If you have any questions, please don't hesitate to contact us.</p>

                        <Button className='bg-black text-white mt-5 px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight'>Thank you!</Button>
                    </div>
                </div>
            </Body>
        </Html>
    );
}


