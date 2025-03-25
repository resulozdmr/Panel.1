"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOpen(window.innerWidth < 1024);
    }
  }, []);

  return (
    <div className="lg:hidden fixed top-1/3 right-0 z-50 flex items-center">
      <motion.div
        initial={{ x: 200 }}
        animate={{ x: isOpen ? 0 : 200 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative bg-white p-3 shadow-xl rounded-l-xl w-16 flex flex-col gap-4 items-center"
      >
        <Link href="/zoom">
          <Image src="/zoom.png" alt="Zoom" width={28} height={28} />
        </Link>
        <Link href="/education">
          <Image src="/FileText.png" alt="Education" width={28} height={28} />
        </Link>
        <Link href="/calendar">
          <Image src="/calendar.png" alt="Calendar" width={28} height={28} />
        </Link>

        {/* Menü açıkken kapanma butonu */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 shadow w-6 h-10 rounded-l flex items-center justify-center"
        >
          <ChevronRight size={16} />
        </button>
      </motion.div>

      {/* Menü kapalıysa tekrar açma butonu */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white border border-gray-300 shadow w-6 h-10 rounded-l flex items-center justify-center"
        >
          <ChevronLeft size={16} />
        </button>
      )}
    </div>
  );
}
