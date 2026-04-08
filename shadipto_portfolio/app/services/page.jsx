"use client";

import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import { delay, motion } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Web Development",
    description:
      "I specialize in creating modern, responsive, and high-performance websites tailored to your needs. Whether it's a personal portfolio, business site, or e-commerce platform, I deliver clean, efficient, and user-friendly web solutions.",
    href: "",
  },
  {
    num: "02",
    title: "UI/UX Design",
    description:
      "I craft intuitive and visually appealing UI/UX designs that enhance user experience and engagement. From wireframing to final design, I focus on creating seamless, user-friendly interfaces that align with your brand and goals.",
    href: "",
  },
  {
    num: "03",
    title: "C++ Development",
    description:
      "I develop efficient and optimized C++ solutions, from algorithms to full-scale applications. With a strong focus on performance and reliability, I build scalable and maintainable code for diverse software needs.",
    href: "",
  },
  {
    num: "04",
    title: "Java Development",
    description:
      "I develop efficient and scalable Java solutions, from backend systems to enterprise applications. With a strong focus on performance, reliability, and maintainability, I build robust software tailored to diverse business and development needs.",
    href: "",
  },
  {
    num: "05",
    title: "Python Development",
    description:
      "I develop efficient and scalable Python solutions, from web applications to data analysis. With a strong focus on performance, reliability, and maintainability, I build robust software tailored to diverse business and development needs.",
    href: "",
  },
  {
    num: "06",
    title: "Windows Form Application Development",
    description:
      "I develop efficient and user-friendly Windows Form applications(dotnet), from desktop software to business solutions. With a strong focus on performance, reliability, and maintainability, I build robust applications tailored to diverse business and development needs.",
    href: "",
  },
];

const Services = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0 zoom-container">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 1.2, duration: 0.4, ease: "easeIn" },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {services.map((service, index) => {
            return (
              <div
                key={index}
                className="flex-1 flex flex-col justify-center gap-6 group"
              >
                {/* top */}

                <div className="w-full flex justify-between items-center">
                  <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline transition-all duration-500">
                    {service.num}
                  </div>
                  <Link
                    href={service.href}
                    className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-hover-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45"
                  >
                    <BsArrowDownRight className="text-primary text-3xl" />
                  </Link>
                </div>
                {/* title */}

                <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-hover-accent transition-all duration-500">
                  {service.title}
                </h2>
                {/* description */}

                <p className="text-white/60 text-justify">
                  {service.description}
                </p>
                {/* border */}

                <div className="border-b border-white/20 w-full"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
