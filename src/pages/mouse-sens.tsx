import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";
import { getMouseSens } from "@/services/github";
import { useQuery } from "@tanstack/react-query";

function MouseSens() {
  const { data: sens, isLoading } = useQuery({
    queryKey: ["mouse-sens"],
    queryFn: () => getMouseSens(),
  });

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="flex min-h-[calc(100svh-50px)] flex-col container mx-auto px-6">
      <section className="text-center">
        <Typography as="h1" className="text-3xl font-medium lowercase mb-8">
          <span className="text-rose-400">Mouse</span>
          <span className="text-amber-300">Sensitivity</span>
        </Typography>
      </section>

      <Table className="border border-slate-700 bg-slate-800  rounded overflow-hidden">
        <TableHeader className="bg-slate-800">
          <TableRow className="text-gray-100 hover:bg-none hover:bg-transparent border-slate-950">
            <TableHead className="text-gray-100">Game</TableHead>
            <TableHead className="text-gray-100">Hip</TableHead>
            <TableHead className="text-gray-100">ADS</TableHead>
            <TableHead className="text-gray-100">FOV</TableHead>
            <TableHead className="text-gray-100">DPI</TableHead>
            <TableHead className="text-gray-100">cm/360</TableHead>
            <TableHead className="text-gray-100">Extras</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sens?.map(
            ({ game, hip, ads, fov, dpi, cm_per_360, extras }, index) => (
              <TableRow
                key={index.toString()}
                className="hover:bg-none hover:bg-transparent border-slate-950"
              >
                <TableCell className="text-gray-400">{game}</TableCell>
                <TableCell className="text-gray-400">
                  {hip ? hip : "-"}
                </TableCell>
                <TableCell className="text-gray-400">
                  {ads ? ads : "-"}
                </TableCell>
                <TableCell className="text-gray-400">
                  {fov ? fov : "-"}
                </TableCell>
                <TableCell className="text-gray-400">
                  {dpi ? dpi : "-"}
                </TableCell>
                <TableCell className="text-gray-400">
                  {cm_per_360 ? cm_per_360 : "-"}
                </TableCell>
                <TableCell className="text-gray-400">
                  {extras ? extras : "-"}
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export { MouseSens };
