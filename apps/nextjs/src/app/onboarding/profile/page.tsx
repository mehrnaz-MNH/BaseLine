"use client";

import React from "react";
import { api } from "@/trpc/react";

const page = () => {
  const users = api.user.all.useQuery();
  console.log(users);
  return <div></div>;
};

export default page;
