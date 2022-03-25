import { useQuery } from "react-query";

export const useDiscordUsername = () => {
  const { data } = useQuery(
    "discord-username",
    async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/username`
      );
      return await response.text();
    },
    {
      initialData: "miapolis#????",
      placeholderData: "miapolis#????",
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  return data;
};
