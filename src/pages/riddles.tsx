import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type Riddle = {
  riddle: string;
  answer: string;
};

const CONSTANTS = {
  URL: "https://riddles-api.vercel.app/random",
  QUERY_KEY: "RIDDLES",
} as const;

function Riddles() {
  const [showAnswer, setShowAnswer] = useState(false);
  const queryClient = useQueryClient();

  const { data: riddle, isLoading } = useQuery({
    queryKey: [CONSTANTS.QUERY_KEY],
    queryFn: async () => {
      const response = await fetch(CONSTANTS.URL);

      if (!response.ok) {
        return null;
      }

      return (await response.json()) as Riddle;
    },
  });

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="flex min-h-[calc(100svh-50px)] flex-col container mx-auto px-6 justify-center items-center">
      <section className="text-center">
        <Typography as="h1" className="text-3xl font-medium lowercase m-8">
          <span className="text-rose-400">Riddles</span>
        </Typography>
      </section>

      <div className="mt-4 text-center">
        <Typography as="h1" className="font-medium mb-4">
          {riddle?.riddle}
        </Typography>

        <Typography as="p" className="text-amber-300">
          {showAnswer ? riddle?.answer : riddle?.answer.replace(/[^\s]/g, "-")}
        </Typography>
      </div>

      <div className="flex mt-4 gap-4">
        <Button
          className="hover:cursor-pointer bg-slate-800 hover:bg-slate-950 mb-4 select-none"
          onClick={() => {
            setShowAnswer(true);
          }}
        >
          Show Answer
        </Button>

        <Button
          className="hover:cursor-pointer bg-slate-800 hover:bg-slate-950 mb-4 select-none"
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: [CONSTANTS.QUERY_KEY] });
            setShowAnswer(false);
          }}
        >
          Refresh
        </Button>
      </div>
    </div>
  );
}

export { Riddles };
