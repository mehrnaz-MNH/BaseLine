import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchAssets(address: string) {
  const { data } = await axios.get(`/api/Assets?address=${address}`);
  return data;
}

function getAssets(address: string) {
  return useQuery({
    queryKey: ["assets"],
    queryFn: () => fetchAssets(address),
  });
}

export default getAssets;
