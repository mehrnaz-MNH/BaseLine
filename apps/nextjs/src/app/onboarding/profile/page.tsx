"use client";

import React, { useState } from "react";
import { api } from "@/trpc/react";
import { GoPerson } from "react-icons/go";
import { MdAlternateEmail, MdOutlineEmail } from "react-icons/md";
import { useAccount } from "wagmi";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  UserName: string;
  email: string;
  profileComplete: boolean;
  emailVerified: boolean;
  identityVerified: boolean;
  onboardingComplete: boolean;
}

const Page = () => {
  const account = useAccount();
  const accAddress = account.status === "connected" ? account.address : "";

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const createUser = api.user.create.useMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: User = {
      id: accAddress,
      firstName,
      lastName,
      UserName: userName,
      email,
      profileComplete: true,
      emailVerified: false,
      identityVerified: false,
      onboardingComplete: false,
    };

    createUser.mutate(newUser, {
      onSuccess: (user) => {
        console.log("User created:", user);
      },
      onError: (error) => {
        console.error("Error creating user:", error);
      },
    });
  };

  return (
    <div className="flex flex-grow flex-col">
      <p className="text pb-[36px] pl-2 text-2xl font-bold text-[#FFFFFF]">
        Profile
      </p>
      <div className="flex flex-grow flex-col">
        <form onSubmit={handleSubmit} className="flex flex-grow flex-col">
          <div className="mb-4 flex min-h-[48px] flex-row items-center gap-2 rounded-[6px] border-[1px] border-[#2E2E2E] bg-[#1A1A1A] p-2 text-[#FFFFFF]">
            <GoPerson className="text-xl text-[#00FFD1]" />
            <input
              type="text"
              placeholder="First Name"
              className="w-full bg-inherit focus:outline-none"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 flex min-h-[40px] flex-row items-center gap-2 rounded-[6px] border-[1px] border-[#2E2E2E] bg-[#1A1A1A] p-2 text-[#FFFFFF]">
            <GoPerson className="text-xl text-[#00FFD1]" />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full bg-inherit focus:outline-none"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 flex min-h-[40px] flex-row items-center gap-2 rounded-[6px] border-[1px] border-[#2E2E2E] bg-[#1A1A1A] p-2 text-[#FFFFFF]">
            <MdAlternateEmail className="text-xl text-[#00FFD1]" />
            <input
              type="text"
              placeholder="UserName"
              className="w-full bg-inherit focus:outline-none"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 flex min-h-[40px] flex-row items-center gap-2 rounded-[6px] border-[1px] border-[#2E2E2E] bg-[#1A1A1A] p-2 text-[#FFFFFF]">
            <MdOutlineEmail className="text-xl text-[#00FFD1]" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-inherit focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mt-auto items-center justify-center pb-[13px] align-middle">
            <button
              type="submit"
              className="min-h-[52px] w-full rounded-[4px] bg-[#00FFD1] font-bold text-[#000000]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
