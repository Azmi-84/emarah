"use client";

import React from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

type BlogCardProps = {
  title: string;
  description: string;
  category: string;
  imageSrc: any;
  onClick: () => void;
};

const createdDate = new Date().toLocaleDateString();

const BlogCard = ({ title, description, category, imageSrc, onClick }: BlogCardProps) => {
  const previewDescription = description.length > 100 ? description.slice(0, 100) + "..." : description;

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border">
        <CardItem className="text-xl font-bold text-neutral-600 dark:text-white">{title}</CardItem>
        <CardItem as="p" className="text-neutral-500 text-sm mt-2 dark:text-neutral-300">
          {previewDescription}
        </CardItem>
        <CardItem className="w-full mt-4">
          <Image
            src={imageSrc}
            height={1000}
            width={1000}
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt={`${category} thumbnail`}
          />
        </CardItem>
        <div className="flex justify-between items-center mt-6">
          <CardItem className="btn-text text-sm text-neutral-500 dark:text-neutral-300">
            Created on: {createdDate}
          </CardItem>
          <CardItem
            as="button"
            onClick={onClick}
            className="px-4 py-2 rounded-lg bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Read more
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};


export default BlogCard;
