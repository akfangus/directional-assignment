import { useQuery } from "@tanstack/react-query";

interface AdviceResponse {
  slip: {
    id: number;
    advice: string;
  };
}

async function fetchAdvice(): Promise<AdviceResponse> {
  const response = await fetch("https://api.adviceslip.com/advice");
  if (!response.ok) {
    throw new Error("Failed to fetch advice");
  }
  return response.json();
}

export function useExampleQuery() {
  return useQuery({
    queryKey: ["advice"],
    queryFn: fetchAdvice,
  });
}
