"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";

//components
import WorkSliderBtns from "@/components/WorkSliderBtns";

const projects = [
  {
    num: "01",
    category: "fullstack",
    title: "project 1",
    description:
      "A sleek portfolio website showcasing my skills, projects, and services with a responsive design and smooth user experience.",
    stack: [
      { name: "React" },
      { name: "Next.JS" },
      { name: "Tailwind CSS" },
      { name: "JavaScript" },
    ],
    image: "/assets/work/sss.png",
    live: "https://shadipto-portfolio.vercel.app/",
    github: "https://github.com/Shadipto/e-portfolio",
  },
  {
    num: "02",
    category: "Java GUI",
    title: "project 2",
    description:
      "A user-friendly GUI-based library management system for efficient book tracking, user management, and seamless borrowing and returning, enhancing library operations.",
    stack: [{ name: "Java" }, { name: "Swing" }],
    image: "/assets/work/LMS3.png",
    live: "https://github.com/Shadipto/Library-Management-System",
    github: "https://github.com/Shadipto/Library-Management-System",
  },
  {
    num: "03",
    category: "Database",
    title: "project 3",
    description:
      "A database-driven project using XAMPP and MySQL for efficient data management, featuring seamless CRUD operations and a user-friendly interface for streamlined interactions.",
    stack: [{ name: "php" }, { name: "Xampp" }, { name: "My Sql" }],
    image: "/assets/work/ddd.png",
    live: "",
    github: "",
  },
  {
    num: "04",
    category: "Smart POS System",
    title: "project 4",
    description:
      "A smart POS system built with C# and .NET, featuring a user-friendly interface for efficient sales management, inventory tracking, and seamless transaction processing.  Designed to enhance retail operations and provide a seamless shopping experience.",
    stack: [{ name: "C#" }, { name: ".NET" }, { name: "Microsoft SQL" }],
    image: "/assets/work/siliconSource.png",
    live: "https://github.com/Shadipto/OOP2-Project-Silicon-Source",
    github: "https://github.com/Shadipto/OOP2-Project-Silicon-Source",
  },
];

const Work = () => {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    // get current slider index
    const currentIndex = swiper.activeIndex;

    // update project state upon current index
    setProject(projects[currentIndex]);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 1.2, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0 zoom-container"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              {/* outline number */}

              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>
              {/* catagory */}

              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-hover-accent transition-all duration-500 capitalize">
                {project.category} project
              </h2>
              {/* description */}

              <p className="text-white/60 text-justify">
                {project.description}
              </p>
              {/* stack */}

              <ul className="flex gap-4">
                {project.stack.map((item, index) => {
                  return (
                    <li key={index} className="text-xl text-accent">
                      {item.name}
                      {/* remove last comma */}

                      {index !== project.stack.length - 1 && ","}
                    </li>
                  );
                })}
              </ul>
              {/* border */}

              <div className="border border-white/20"></div>
              {/* buttons */}

              <div className="flex items-center gap-4">
                {/* live project button */}

                <Link
                  href={project.live || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-hover-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                {/* github project button */}

                <Link
                  href={project.github || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-white text-3xl group-hover:text-hover-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                      {/* overlay */}

                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      {/* image */}

                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          fill
                          className="object-cover"
                          alt={project.title}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              {/* slider buttons */}

              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-hover-accent text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
