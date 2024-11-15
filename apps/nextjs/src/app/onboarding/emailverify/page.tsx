"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { FaHashtag } from "react-icons/fa6";
import { useAccount } from "wagmi";

const Page = () => {
  const [code, setCode] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const account = useAccount();
  const address: string = account.address as string;
  const { data } = api.user.byId.useQuery({ id: address });
  const user = (data as any)?._doc;
  const email: string = user?.email;
  const vercode: string = user?.verificationCode;
  const updateUserVerification = api.user.update.useMutation();
  console.log(email);
  console.log(vercode);
  console.log(data);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("input code", code);
    if (!vercode || vercode !== code || vercode === "000000") {
      setIsVerified(false);

      console.log("here");
    }

    try {
      await updateUserVerification.mutateAsync({
        id: address,
        emailVerified: true,
      });

      setIsVerified(true);
      console.log("reached here");
    } catch (error) {
      console.error("Verification failed:", error);
      setIsVerified(false);
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (isVerified) {
      router.push("/onboarding");
    }
  }, [isVerified, router]);

  return (
    <div className="flex flex-grow flex-col">
      <div className="mb-16">
        <p className="mb-3 text-[24px] font-bold text-white">Confirm email</p>
        <p className="text-[15px] font-normal text-[#9C9C9C]">
          A verification code has been sent to
        </p>
        <p className="text-[15px] font-normal text-[#00FFD1]">{email}</p>
      </div>
      <div className="flex flex-grow flex-col">
        <form onSubmit={handleSubmit} className="flex flex-grow flex-col">
          <p className="mb-2 text-[17px] font-bold text-white">Enter code</p>
          <div className="mb-4 flex min-h-[48px] flex-row items-center gap-2 rounded-[6px] border-[1px] border-[#2E2E2E] bg-[#1A1A1A] p-2 text-[#FFFFFF]">
            <FaHashtag className="text-xl text-[#00FFD1]" />
            <input
              type="text"
              placeholder="Verification Code"
              className="w-full bg-inherit focus:outline-none"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>

          <div className="mt-auto items-center justify-center pb-[13px] align-middle">
            <button
              type="submit"
              className="min-h-[52px] w-full rounded-[4px] bg-[#00FFD1] font-bold text-[#000000]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
