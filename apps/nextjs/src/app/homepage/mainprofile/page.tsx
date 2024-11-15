"use client";

import React, { useState } from "react";
import { api } from "@/trpc/react";
import { FaCheckCircle } from "react-icons/fa";
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
  verificationCode: string;
}

const Page = () => {
  const account = useAccount();
  const accAddress = account.status === "connected" ? account.address : "";
  const { data } = api.user.byId.useQuery({ id: accAddress });
  const user = (data as any)?._doc;

  const [firstName, setFirstName] = useState<string>(user?.firstName);
  const [lastName, setLastName] = useState<string>(user?.lastName);
  const [userName, setUserName] = useState<string>(user?.UserName);
  const [email, setEmail] = useState<string>(user?.email);

  const updateUserVerification = api.user.update.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateUserVerification.mutateAsync({
      id: accAddress,
      firstName: firstName,
      lastName: lastName,
      UserName: userName,
    });
  };

  return (
    <div className="flex flex-grow flex-col">
      <p className="pb-3 pt-6 text-[14px] font-bold text-[#FFFFFF]">Details</p>
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

          <div className="text-white">
            <p>Email</p>

            {user?.emailVerified === true ? (
              <div className="flex flex-row justify-between">
                <div className="flex flex-row">
                  <FaCheckCircle className="text-xl text-[#00FFD1]" />
                  <p className="pl-1">verified</p>
                </div>
                <div>
                  <p className="text-[12px] text-[#A7A8AA]">{user?.email}</p>
                </div>
              </div>
            ) : (
              <></>
            )}
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
