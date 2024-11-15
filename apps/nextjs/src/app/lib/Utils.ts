import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchAssets(address: string) {
  const { data } = await axios.get(`/api/Assets?address=${address}`);
  return data;
}

export function getAssets(address: string) {
  return useQuery({
    queryKey: ["assets"],
    queryFn: () => fetchAssets(address),
  });
}

async function emailsender(email: string, code: string) {
  const { data } = await axios.get(
    `/api/sendemail?email=${email}&code=${code}`,
  );
  return data;
}

export function sendEmail() {
  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      emailsender(email, code),
  });
}
