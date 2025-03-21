import { Home, FileText } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

// Zoom logo path
const zoomLogo = "/zoom.png";

// Type definition
interface NAVITEMS {
  src: string;
  icon: JSX.Element;
  text?: string;
}

const openZoomApp = () => {
  window.open("zoommtg://zoom.us/start", "_blank"); // ✅ Opens Zoom application
};

const navItems: NAVITEMS[] = [
  {
    src: "/",
    icon: <Home />,
    text: "Home",
  },
  {
    src: "/education",
    icon: (
      <Link href="/education" passHref>
        <Image
          src="/FileText.png"  // Custom Image Icon
          alt="Education Logo"
          width={25}
          height={17}
          className="rounded-md cursor-pointer"
        />
      </Link>
    ),
    text: "Education",
},
  {
    src: "#", // Prevent navigation, using onClick instead
    icon: (
      <div className="flex items-center justify-center h-full" onClick={openZoomApp}> {/* ✅ Centered vertically and horizontally */}
        <Image
          src={zoomLogo}
          alt="Zoom Logo"
          width={55}
          height={44}
          className="rounded-md cursor-pointer"
        />
      </div>
    ),
  },
];

const NavItems = () => {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center p-2 md:gap-8"> {/* ✅ Responsive for mobile */}
      {navItems.map((navItem, index) => (
        <Link key={index} href={navItem.src} passHref>
          <div className="flex flex-col items-center cursor-pointer text-[#666666] hover:text-black">
            <span>{navItem.icon}</span>
            {navItem.text && (
              <span className="text-xs mt-1">{navItem.text}</span> // ✅ Text under the icon
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
