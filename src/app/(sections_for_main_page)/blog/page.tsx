"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import Header from "@/sections/Header";
import Footer from "@/sections/Footer";
import { Pagination } from "@nextui-org/pagination";
import LinuxImage from "@/assets/Linux.jpg";
import AiImage from "@/assets/AI.jpg";
import HealthImage from "@/assets/Health.jpg";
import QuantumImage from "@/assets/QuantumImage.jpg";
import OpenSourceImage from "@/assets/OpenSourceImage.jpg";
import ClimateImage from "@/assets/ClimateImage.jpg";
import IoTImage from "@/assets/IoTImage.jpg";
import FiveGImage from "@/assets/FiveGImage.jpg";
import EVImage from "@/assets/EVImage.jpg";
import BlockchainImage from "@/assets/BlockchainImage.jpg";
import RemoteWorkImage from "@/assets/RemoteWorkImage.jpg";
import ARImage from "@/assets/ARImage.jpg";
import BlogCard from "@/components/BlogCard";
import { AnimatePresence } from "framer-motion";

type BlogPost = {
  title: string;
  description: string;
  category: string;
  imageSrc: any;
};

const Blog = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const posts: BlogPost[] = [
    {
      title: "The AI Revolution: Shaping Our World with Intelligent Machines",
      description: "Artificial intelligence (AI) is reshaping the way we live, work, and interact with technology. By leveraging algorithms, machine learning models, and large datasets, AI enables machines to perform tasks that once required human intelligence, such as understanding speech, recognizing images, and making decisions. The AI revolution spans multiple industries, with its most notable impact being in automation, where machines take over repetitive tasks, freeing up human workers to focus on more complex problems. In healthcare, AI enhances diagnostic tools, helping doctors detect diseases earlier with greater accuracy. In finance, AI is used for fraud detection, risk management, and algorithmic trading. As AI technologies evolve, they continue to open up new possibilities, including self-driving cars, AI-generated art, and advanced robotics. However, with these advancements come challenges related to ethics, privacy, and job displacement, requiring careful consideration of how AI will integrate into our society and economy.",
      category: "AI",
      imageSrc: AiImage,
    },
    {
      title: "Why Linux Empowers Developers Everywhere",
      description: "Linux has long been a favorite among developers due to its open-source nature, reliability, and the freedom it offers in terms of customization. As an open-source operating system, Linux allows developers to modify and improve the code to suit their unique needs, making it ideal for programming, server management, and system administration. Its powerful command-line interface (CLI) provides greater control over the system, offering advanced features like package management, scripting, and automation. Linux’s security and stability are crucial for developers working in environments where reliability is paramount. With a thriving community that continually contributes to its development, Linux is also constantly evolving, making it a preferred choice for building everything from web servers to embedded systems. Its compatibility with a wide range of programming languages, including Python, C++, and Java, further solidifies its position as a go-to platform for developers across the globe.",
      category: "Linux",
      imageSrc: LinuxImage,
    },
    {
      title: "Health Meets Tech: Revolutionizing Care",
      description: "In recent years, the healthcare sector has seen tremendous advancements driven by technology, resulting in improved patient outcomes, greater efficiency, and more personalized care. AI-powered diagnostic tools now assist doctors in analyzing medical images, detecting conditions like cancer and heart disease with unparalleled accuracy. Telemedicine platforms are enabling patients in remote areas to receive medical consultations without the need to travel long distances. Wearable devices, such as fitness trackers and smartwatches, are empowering individuals to monitor their health in real-time, alerting them to potential health issues before they become critical. Additionally, innovations such as robotic surgery, 3D printing of prosthetics, and precision medicine are transforming how treatments are delivered. The integration of data analytics, AI, and IoT into healthcare is creating more streamlined processes, reducing wait times, and enhancing overall accessibility, making healthcare a more efficient and accessible system for everyone.",
      category: "Health",
      imageSrc: HealthImage,
    },
    {
      title: "Quantum Computing: Unlocking New Horizons",
      description: "Quantum computing is poised to revolutionize the computing world by solving problems that are currently beyond the reach of classical computers. Unlike traditional computers that use binary bits to process information, quantum computers use qubits, which can represent multiple states simultaneously due to the principles of quantum mechanics. This ability allows quantum computers to process vast amounts of data in parallel, providing solutions to complex problems in fields like cryptography, material science, and drug development. For example, quantum computing could one day lead to the discovery of new materials with applications in energy storage or help solve optimization problems in logistics that are too intricate for current systems. While quantum computing is still in its infancy, advancements in this field promise to unlock new possibilities in areas such as artificial intelligence, climate change modeling, and secure communication.",
      category: "Technology",
      imageSrc: QuantumImage,
    },
    {
      title: "Open Source vs Proprietary: Finding Your Fit",
      description: "When it comes to choosing software for a project, organizations often face a decision between open-source and proprietary solutions. Open-source software is free to use, modify, and distribute, offering flexibility, transparency, and community-driven innovation. With open-source tools, developers can customize the software to meet their specific needs, often resulting in highly efficient and cost-effective solutions. However, open-source software may lack the polished user interface and dedicated support that proprietary software offers. On the other hand, proprietary software typically comes with professional support, regular updates, and specialized features, but it comes with licensing costs. Organizations need to carefully assess their specific requirements, including security, scalability, cost, and functionality, before choosing the right solution for their needs.",
      category: "Software",
      imageSrc: OpenSourceImage,
    },
    {
      title: "AI and Climate Change: A Dynamic Duo of Change",
      description: "Artificial intelligence (AI) is becoming an essential tool in the fight against climate change, helping scientists and policymakers analyze vast amounts of environmental data to understand and mitigate the impact of global warming. AI can predict weather patterns, identify areas at risk of environmental disasters, and optimize energy consumption to reduce carbon footprints. Additionally, AI is being used to monitor deforestation, track endangered species, and analyze the effects of human activities on ecosystems. Machine learning algorithms are also improving the efficiency of renewable energy systems, such as wind and solar power, making them more viable alternatives to fossil fuels. By leveraging AI's ability to process data at scale, we can develop smarter, more sustainable solutions for preserving the environment and combating climate change on a global scale.",
      category: "Environment",
      imageSrc: ClimateImage,
    },
    {
      title: "Cybersecurity in IoT: Safeguarding Connections",
      description: "The Internet of Things (IoT) is transforming industries by connecting everyday objects to the internet, enabling smarter cities, homes, and workplaces. However, the vast network of interconnected devices also presents significant security challenges. Each IoT device represents a potential entry point for cyberattacks, making it crucial to implement robust cybersecurity measures to protect sensitive data and maintain the integrity of the entire system. Strong encryption, secure communication protocols, and regular software updates are essential for preventing vulnerabilities. Additionally, businesses and consumers must be aware of privacy concerns and adopt best practices for securing IoT devices, ensuring that they can benefit from the innovations these technologies offer without compromising security.",
      category: "Security",
      imageSrc: IoTImage,
    },
    {
      title: "5G Technology: Redefining Connectivity and Speed",
      description: "5G is the next-generation wireless technology that promises to revolutionize how we connect to the internet, offering unprecedented speeds, lower latency, and the ability to support a massive number of devices simultaneously. The key benefit of 5G is its ability to provide near-instantaneous communication, which will unlock new possibilities for industries such as autonomous driving, healthcare, and entertainment. For example, in healthcare, 5G enables real-time remote monitoring and telemedicine, while in the automotive sector, it supports vehicle-to-vehicle communication for safer self-driving cars. The high-speed capabilities of 5G also allow for seamless integration of the Internet of Things (IoT), enabling smarter cities, connected devices, and more efficient operations across industries. As 5G networks continue to roll out globally, they will lay the foundation for the next wave of technological innovation.",
      category: "Telecom",
      imageSrc: FiveGImage,
    },
    {
      title: "Electric Vehicles: Driving a Greener Tomorrow",
      description: "Electric vehicles (EVs) are a key component of the transition to a greener, more sustainable future. By replacing traditional gasoline-powered cars with electric alternatives, we can significantly reduce greenhouse gas emissions and decrease our dependence on fossil fuels. EVs offer a clean, efficient mode of transportation, with zero emissions during operation and lower lifetime carbon footprints. Advances in battery technology and an expanding charging infrastructure have made EVs more accessible and affordable than ever before. As the adoption of electric vehicles increases, they are helping to transform the automotive industry and contribute to the fight against climate change, paving the way for a cleaner, more sustainable transportation system for future generations.",
      category: "Automotive",
      imageSrc: EVImage,
    },
    {
      title: "Blockchain Beyond Crypto: Transforming Systems",
      description: "Blockchain technology, best known for powering cryptocurrencies like Bitcoin, has far-reaching applications beyond digital currencies. Its decentralized, transparent nature makes it an ideal solution for securing and streamlining transactions in a wide range of industries. In supply chain management, blockchain can provide end-to-end visibility, ensuring that goods are tracked and verified at every stage of the process. In healthcare, blockchain enhances the security and privacy of patient records, while in financial services, it enables faster and more secure transactions. Blockchain's ability to eliminate intermediaries and create trustless systems is transforming industries by improving transparency, security, and efficiency.",
      category: "Blockchain",
      imageSrc: BlockchainImage,
    },
    {
      title: "Remote Work Revolution: The Digital Era of Collaboration",
      description: "The rise of remote work has reshaped the global workforce, making it possible for employees to collaborate and contribute from virtually anywhere. This shift has been driven by advancements in digital communication tools, including video conferencing, project management software, and cloud-based file sharing. Remote work allows businesses to access a global talent pool, reduce overhead costs, and offer greater flexibility to employees, leading to improved work-life balance. However, it also presents new challenges, such as maintaining team cohesion, ensuring cybersecurity, and adapting company culture to a digital-first environment. As remote work becomes the norm, companies will need to embrace new strategies and technologies to foster collaboration and productivity in a distributed workforce.",
      category: "Workplace",
      imageSrc: RemoteWorkImage,
    },
    {
      title: "Augmented Reality: Bridging Realities Together",
      description: "Augmented reality (AR) is changing the way we interact with the world around us by blending the physical and digital realms. AR technology superimposes digital information, such as images, sounds, and videos, onto the real world, creating immersive and interactive experiences. This technology has revolutionized industries like gaming, retail, and education, providing new ways to engage users. In healthcare, AR is being used for surgical training and patient education, while in manufacturing, it assists in design and prototyping. As AR continues to advance, its potential expands into fields such as architecture, tourism, and advertising, providing innovative ways to bridge the gap between the physical and digital worlds.",
      category: "AR",
      imageSrc: ARImage,
    },
  ];
  
  const postsPerPage = 9;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const paginatedPosts = posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <>
      <motion.div style={{ scaleX }} className="progress-bar z-[999]"></motion.div>
      <Header />
      <section className="bg-gradient-to-b from-white to-blue-100 py-12 overflow-x-clip">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          >
            {paginatedPosts.map((post, index) => (
              <motion.div
                key={index}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              >
                <BlogCard
                  title={post.title}
                  description={post.description}
                  category={post.category}
                  imageSrc={post.imageSrc}
                  onClick={() => handleReadMore(post)}
                />
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mt-8"
          >
            <Pagination
              loop
              showShadow
              showControls
              color="warning"
              initialPage={currentPage}
              total={totalPages}
              onChange={(page) => setCurrentPage(page)}
            />
          </motion.div>
        </div>
      </section>
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 max-w-3xl p-6 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-4 right-4 text-black dark:text-white font-bold"
                onClick={handleCloseModal}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{selectedPost.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Category: {selectedPost.category}</p>
              <Image
                src={selectedPost.imageSrc}
                alt={`${selectedPost.category} image`}
                width={800}
                height={400}
                className="w-full h-60 object-cover rounded-lg mb-6"
              />
              <p className="text-base text-gray-700 dark:text-gray-200">{selectedPost.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default Blog;
