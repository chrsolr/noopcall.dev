import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";
import { getAoCReadme } from "@/services/github";
import { useQuery } from "@tanstack/react-query";
import groupBy from "lodash.groupby";
import orderBy from "lodash.orderby";
import { useEffect, useState } from "react";

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

function AoCTable({ title, aocs }: { title: string; aocs: AdventOfCode[] }) {
  return (
    <div className="mb-6">
      <Typography as="h3" className="text-xl font-medium lowercase mb-4">
        {title}
      </Typography>
      <Table className="border border-slate-700 bg-slate-800  rounded overflow-hidden">
        <TableHeader className="bg-slate-800 ">
          <TableRow className="text-gray-100 ">
            <TableHead className="text-gray-100">Year</TableHead>
            <TableHead className="text-gray-100">Day</TableHead>
            <TableHead className="text-gray-100">Code</TableHead>
            <TableHead className="text-gray-100">Challenge</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {aocs.map(({ year, day, challengeUrl, codeUrl }) => (
            <TableRow key={`${year}-${day}`}>
              <TableCell className="font-medium">{year}</TableCell>
              <TableCell>{day}</TableCell>
              <TableCell>{codeUrl}</TableCell>
              <TableCell>{challengeUrl}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function AoC() {
  const [items, setItems] = useState<
    Record<string, AdventOfCode[]> | undefined
  >();
  const { data, isLoading } = useQuery({
    queryKey: ["aoc-readme"],
    queryFn: () => getAoCReadme(),
  });

  useEffect(() => {
    const aocItems = extractAcCTables(data!);

    const orederedItems = orderBy(aocItems, ["year", "day"]);
    const groupedItems = groupBy(orederedItems, "lang");

    setItems(groupedItems);
  }, [data]);

  if (isLoading) {
    return <></>;
  }

  // TODO: Split by lang and year
  return (
    <div className="flex min-h-[calc(100svh-50px)] flex-col container mx-auto px-6">
      {items &&
        Object.entries(items!).map(([lang, aocs], index) => (
          <AoCTable key={index.toString()} title={lang} aocs={aocs} />
        ))}
    </div>
  );
}

export { AoC };
