import React from "react";
import Image from "next/image";
import Link from "next/link";
import ProfilePhoto from "./shared/ProfilePhoto";
import { getAllPosts } from "@/lib/serveractions";

type Props = {
  user: {
    id: string;
    email: string;
    user_metadata: {
      firstName: string;
      lastName: string;
      username: string;
    };
  };
};

const Sidebar = async ({ user }: Props) => {
  let posts = [];

  try {
    posts = (await getAllPosts()) || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <div className="w-full border border-gray-300 bg-white rounded-lg overflow-hidden">
      {/* Banner */}
      <Link href="/" className="block">
        <Image
          src="/banner.png"
          alt="Banner"
          layout="responsive"
          width={200}
          height={100}
          className="w-full object-cover"
        />
      </Link>

      {/* User Info */}
      <div className="p-4 border-b border-gray-300 flex items-center gap-4">
        {/* Eğer ProfilePhoto bileşeniniz zaten kendi stilini yönetiyorsa className eklemeyin */}
        <ProfilePhoto src="/logo-2.png" />
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-left hover:underline cursor-pointer">
            {user.user_metadata.firstName} {user.user_metadata.lastName}
          </h1>
          <p className="text-sm text-gray-500 text-left">
            @{user.user_metadata.username}
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="p-4">
        <h3 className="text-base font-bold text-gray-800 mb-2">Contact Us</h3>
        <ul className="space-y-3 text-sm text-gray-700">
          <li>
            <strong>Location:</strong>
            <div className="text-gray-600">
              Bahçelievler Mah. Aşkabat Cad,
              <br />
              Aşkabat Cd. No:61 Çankaya/Ankara
            </div>
          </li>
          <li>
            <strong>Email:</strong>
            <div className="text-gray-600">
              info@drgulf.net
              <br />
              cv@drgulf.net
            </div>
          </li>
          <li>
            <strong>Phone:</strong>
            <div className="text-gray-600">
              +90 850 532 95 25
              <br />
              +90 532 151 92 86
            </div>
          </li>
          <li>
            <strong>WhatsApp:</strong>
            <div className="text-gray-600">
              <a
                href="https://wa.me/905321519286"
                target="_blank"
                className="text-green-600 hover:underline"
                rel="noreferrer"
              >
                +90 532 151 92 86
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
