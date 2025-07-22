import { Typography } from "@/components/ui/typography";
import { getAoCReadme } from "@/services/github";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type AdventOfCode = {
  year: number;
  day: number;
  challengeUrl: string;
  codeUrl: string;
  lang: string;
};

function extractAcCTables(markdown: string): AdventOfCode[] {
  if (!markdown) {
    return [];
  }

  // const lines = markdown.split("\n");

  return [];
}

function AoC() {
  const { data, isLoading } = useQuery({
    queryKey: ["aoc-readme"],
    queryFn: () => getAoCReadme(),
  });

  useEffect(() => {
    const aocItems = extractAcCTables(data!);

    console.log(data, aocItems);
  }, [data]);

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="flex min-h-[calc(100svh-50px)] flex-col items-center justify-center ">
      <section className="text-center">
        <Typography as="h1" className="text-3xl font-medium lowercase">
          Coming Soon
        </Typography>
      </section>
    </div>
  );
}

export { AoC };
