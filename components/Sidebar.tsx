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
    <div className="w-full border border-gray-300 bg-white rounded-lg">
      {/* Banner */}
      <div className="flex flex-col items-center">
        <Link href="/">
          <div className="w-full h-auto overflow-hidden cursor-pointer">
            <Image
              src="/banner.png"
              alt="Banner"
              layout="responsive"
              width={200}
              height={100}
              className="rounded-t"
            />
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="border-b border-b-gray-300 flex flex-col items-center p-2">
        <div className="flex items-center gap-2 mt-3">
          {/* Profil fotoğrafı */}
          <ProfilePhoto src="/logo-2.png" />
          {/* Kullanıcı adı ve soyadı */}
          <div>
            <h1 className="font-bold hover:underline cursor-pointer">
              {user.user_metadata.firstName} {user.user_metadata.lastName}
            </h1>
            <p className="text-xs text-gray-600">
              @{user.user_metadata.username}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="border-t border-gray-300 p-4 text-right pr-4">
        <h3 className="font-bold text-xl text-gray-800 mb-4">Contact Us</h3>
        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <strong>Location:</strong>
            <br />
            Bahçelievler Mah. Aşkabat Cad,
            <br />
            Aşkabat Cd. No:61 Çankaya/Ankara
          </div>
          <div>
            <strong>Email:</strong>
            <br />
            info@drgulf.net
            <br />
            cv@drgulf.net
          </div>
          <div>
            <strong>Phone:</strong>
            <br />
            +90 850 532 95 25
            <br />
            +90 532 151 92 86
          </div>
          <div>
            <strong>WhatsApp:</strong>
            <br />
            <a
              href="https://wa.me/905321519286"
              target="_blank"
              className="text-green-600 hover:underline"
              rel="noreferrer"
            >
              +90 532 151 92 86
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
