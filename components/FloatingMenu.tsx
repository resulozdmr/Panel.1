"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOpen(window.innerWidth < 1024); // sadece mobilde açık başlat
    }
  }, []);

  return (
    <div className="lg:hidden fixed top-1/3 right-0 z-50 flex items-center">
      {/* Menü Kutusu */}
      <motion.div
        initial={{ x: 200 }}
        animate={{ x: isOpen ? 0 : 200 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative bg-white p-4 shadow-xl rounded-l-xl w-20 flex flex-col gap-5 items-center"
      >
        {/* Menü İçeriği */}
        <Link href="/zoom">
          <Image src="/zoom.png" alt="Zoom" width={35} height={35} />
        </Link>
        <Link href="/education">
          <Image src="/FileText.png" alt="Education" width={35} height={35} />
        </Link>
        <Link href="/calendar">
          <Image src="/calendar.png" alt="Calendar" width={35} height={35} />
        </Link>

        {/* Aç/Kapa Butonu (menü açıkken sağda) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 shadow-md w-10 h-16 rounded-l-md flex items-center justify-center text-xl font-bold"
        >
          {isOpen ? ">" : "<"}
        </button>
      </motion.div>

      {/* Menü kapalıyken sadece buton görünsün */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="ml-2 bg-white border border-gray-300 shadow-md w-10 h-16 rounded-l-md flex items-center justify-center text-xl font-bold"
        >
          {"<"}
        </button>
      )}
    </div>
  );
}
