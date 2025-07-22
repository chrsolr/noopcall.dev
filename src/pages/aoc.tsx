import { Typography } from "@/components/ui/typography";
import { getAoCReadme } from "@/services/github";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import orderBy from "lodash.orderby";
import groupBy from "lodash.groupby";

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

  const aocs: AdventOfCode[] = [];
  const pattern = /^\|\s*\d{4}\s*\|\s*\d{2}\s*\|/;

  const lines = markdown.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      continue;
    }

    const matched = pattern.test(line);
    if (!matched) {
      continue;
    }

    const splitted = line
      .split("|")
      .map((s) => s.trim())
      .filter((s) => s);

    const aoc = {
      year: parseInt(splitted[0]),
      day: parseInt(splitted[1]),
      challengeUrl: (() => {
        const match = splitted[3]?.match(/\(([^)]+)\)/);
        return match ? match[1] : "";
      })(),
      codeUrl: (() => {
        const match = splitted[2]?.match(/\(([^)]+)\)/);
        return match
          ? "https://github.com/chrsolr/advent-of-code/blob/main" +
              match[1].slice(1)
          : "";
      })(),
      lang: (() => {
        const match = splitted[2]?.match(/\[([^\]]+)\]/);
        return match ? match[1] : "";
      })(),
    };

    aocs.push(aoc);
  }

  return aocs;
}

function AoC() {
  const [, setItems] = useState<Record<string, AdventOfCode[]> | undefined>();
  const { data, isLoading } = useQuery({
    queryKey: ["aoc-readme"],
    queryFn: () => getAoCReadme(),
  });

  useEffect(() => {
    const aocItems = extractAcCTables(data!);

    const orederedItems = orderBy(aocItems, ["year", "day"]);
    const groupedItems = groupBy(orederedItems, "lang");

    setItems(groupedItems);

    console.log(groupedItems);
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
