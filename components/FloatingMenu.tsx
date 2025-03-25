"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-1/3 right-0 z-50 flex flex-col items-end lg:hidden">
      {/* Menü Kutusu */}
      <motion.div
        initial={{ x: 200 }}
        animate={{ x: isOpen ? 0 : 200 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white p-4 shadow-xl rounded-l-xl w-48 flex flex-col gap-4 items-start relative"
      >
        {/* Sol taraftaki çıkıntı (toggle tuşu gibi) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 shadow-md w-6 h-12 rounded-l-md flex items-center justify-center"
        >
          {isOpen ? ">" : "<"}
        </button>

        {/* Menü içerikleri */}
        <Link href="/zoom" className="flex items-center gap-2">
          <Image src="/zoom.png" alt="Zoom" width={24} height={24} />
          <span>Zoom</span>
        </Link>

        <Link href="/education" className="flex items-center gap-2">
          <Image src="/FileText.png" alt="Education" width={24} height={24} />
          <span>Education</span>
        </Link>

        <Link href="/calendar" className="flex items-center gap-2">
          <Image src="/calendar.png" alt="Calendar" width={24} height={24} />
          <span>Calendar</span>
        </Link>
      </motion.div>
    </div>
  );
}
