import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/components/ui/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Typography } from "@/components/ui/typography";
import { stringToHyphen } from "@/lib/utils";
import {
  getCategories,
  getCategory,
  getRandomRiddle,
  getRiddleCount,
} from "@/services/riddles";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const CONSTANTS = {
  QUERY_KEY: "RIDDLES",
} as const;

// TODO:
// - Save previously answered riddle
//   in local storage.
// - Don't repeat answered riddle.
// - Show viewed count of riddle.
//   47 of 288 riddles
function Riddles() {
  const queryClient = useQueryClient();
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const riddleCount = getRiddleCount();
  const categories = [...getCategories(), "Random"];

  const { data: riddle, isLoading } = useQuery({
    queryKey: [CONSTANTS.QUERY_KEY],
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch on remount
    refetchOnReconnect: false, // Don't refetch on reconnect
    staleTime: Infinity, // Data stays fresh forever
    queryFn: () => getRandomRiddle(),
  });

  const onCategorySelect = (category: string) => {
    const filteredRiddle =
      category === "Random" ? getRandomRiddle() : getCategory(category);

    queryClient.setQueryData([CONSTANTS.QUERY_KEY], filteredRiddle);

    setSelectedCategory(category);
    setShowAnswer(false);
  };

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

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              className="hover:cursor-pointer bg-slate-800 hover:bg-slate-950 select-none"
              onClick={() => {
                setShowAnswer(true);
              }}
            >
              {`Category: ${selectedCategory ?? "Random"}`}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="hover:bg-slate-800 bg-slate-800 border-none text-gray-100 justify-center text-center">
            {categories.map((category) => (
              <DropdownMenuItem
                key={category}
                className="hover:!bg-slate-700 hover:!text-violet-300 justify-center text-center cursor-pointer"
                onClick={() => onCategorySelect(category)}
              >
                <Typography className="text-slate-400 text-sm mt-2 mb-2">
                  {category}
                </Typography>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="mt-2 flex justify-center">
          <Popover>
            <PopoverTrigger className="text-amber-300 hover:cursor-pointer block justify-center items-center">
              💡 hint
            </PopoverTrigger>

            <PopoverContent
              side="top"
              className="bg-slate-800 justify-center text-amber-300 flex border-none m-0 py-2"
            >
              {riddle?.hint}
            </PopoverContent>
          </Popover>
        </div>
      </section>

      <div className="mt-4 text-center">
        <Typography as="h1" className="font-medium mb-4">
          {riddle?.question}
        </Typography>

        <Typography as="p" className="text-amber-300">
          {showAnswer ? riddle?.answer : stringToHyphen(riddle?.answer ?? "")}
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
          Next
        </Button>
      </div>

      <Link
        to="https://github.com/chrsolr/noopcall.dev/blob/main/src/pages/riddles.tsx"
        isExternal
        className="inline-block text-sm text-slate-400 hover:underline"
      >
        View Source Code
      </Link>
    </div>
  );
}

export { Riddles };
