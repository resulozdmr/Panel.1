"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 1024;
      setIsOpen(isMobile);
    }
  }, []);

  return (
    <div className="fixed top-1/3 right-0 z-50 flex flex-col items-end lg:hidden">
      {/* Aç/Kapa butonu - daima görünür */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 shadow-md w-10 h-16 rounded-l-md flex items-center justify-center text-xl font-bold z-50"
      >
        {isOpen ? ">" : "<"}
      </button>

      <motion.div
        initial={{ x: 200 }}
        animate={{ x: isOpen ? 0 : 200 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white p-4 shadow-xl rounded-l-xl w-20 flex flex-col gap-5 items-center relative"
      >
        <Link href="/zoom">
          <Image
            src="/zoom.png"
            alt="Zoom"
            width={32}
            height={32}
            className="cursor-pointer"
          />
        </Link>

        <Link href="/education">
          <Image
            src="/FileText.png"
            alt="Education"
            width={32}
            height={32}
            className="cursor-pointer"
          />
        </Link>

        <Link href="/calendar">
          <Image
            src="/calendar.png"
            alt="Calendar"
            width={32}
            height={32}
            className="cursor-pointer"
          />
        </Link>
      </motion.div>
    </div>
  );
}
