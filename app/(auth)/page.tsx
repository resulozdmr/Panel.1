"use client";

import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="bg-white p-10 shadow-xl rounded-lg w-full max-w-lg">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="Dr. Gulf Logo" width={150} height={150} />
        </div>

        {/* Clerk SignUp Bileşeni */}
        <SignUp
          appearance={{
            elements: {
              card: "shadow-md p-6 bg-white rounded-lg",
              headerTitle: "text-center text-2xl font-bold mb-4",
              formFieldInput: "border border-gray-300 rounded-lg p-2 w-full",
              formButtonPrimary: "bg-blue-600 text-white rounded-lg p-2 mt-4",
            },
          }}
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
