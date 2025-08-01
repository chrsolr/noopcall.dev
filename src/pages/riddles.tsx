import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Typography } from "@/components/ui/typography";
import { getRandomRiddle, getRiddleCount } from "@/services/riddles";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const CONSTANTS = {
  URL: "https://riddles-api.vercel.app/random",
  QUERY_KEY: "RIDDLES",
} as const;

// TODO: Add categories

function Riddles() {
  const [showAnswer, setShowAnswer] = useState(false);
  const queryClient = useQueryClient();

  const riddleCount = getRiddleCount();
  // const categories = getCategories();

  const { data: riddle, isLoading } = useQuery({
    queryKey: [CONSTANTS.QUERY_KEY],
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch on remount
    refetchOnReconnect: false, // Don't refetch on reconnect
    staleTime: Infinity, // Data stays fresh forever
    queryFn: () => getRandomRiddle(),
  });

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="flex min-h-[calc(100svh-50px)] flex-col container mx-auto px-6 justify-center items-center">
      <section className="text-center">
        <Typography as="h1" className="text-3xl font-medium lowercase">
          <span className="text-rose-400">Riddles</span>
        </Typography>

        <Typography className="text-slate-400 text-sm mt-2 mb-2">
          {riddleCount} Riddles
        </Typography>

        <Tooltip>
          <TooltipTrigger asChild>
            <Typography as="p" className="text-amber-300 hover:cursor-pointer">
              💡 hint
            </Typography>
          </TooltipTrigger>
          <TooltipContent className="bg-slate-800 p-4 text-center justify-center items-center flex">
            <Typography as="p" className="text-amber-300">
              {riddle?.hint}
            </Typography>
          </TooltipContent>
        </Tooltip>
      </section>

      <div className="mt-4 text-center">
        <Typography as="h1" className="font-medium mb-4">
          {riddle?.question}
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
