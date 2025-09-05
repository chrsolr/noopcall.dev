import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { Typography } from "@/components/ui/typography";
import { useState } from "react";

type Side = "heads" | "tails" | null;

function FlipACoin() {
  const [currentSide, setCurrentSide] = useState<Side>(null);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [count, setCount] = useState({ heads: 0, tails: 0 });

  const onFlip = () => {
    setIsFlipping(true);
    setCurrentSide(null);

    const delay = Math.floor(Math.random() * (1500 - 700 + 1)) + 700;

    setTimeout(() => {
      const result = Math.random() < 0.5 ? "heads" : "tails";
      setCurrentSide(result);
      setIsFlipping(false);
      setCount((prev) => ({
        ...prev,
        [result]: prev[result] + 1,
      }));
    }, delay);
  };

  return (
    <div className="flex min-h-[calc(100svh-50px)] flex-col items-center justify-center select-none">
      <section className="text-center mb-2">
        <Typography as="h1" className="text-3xl font-medium lowercase">
          <span className="text-rose-400">Flip</span>
          <span className="text-amber-300">a</span>
          <span className="text-violet-300">Coin</span>
        </Typography>

        <div className="mt-4">
          <Typography className="mb-4 text-lg">
            {currentSide === "heads"
              ? "🙂 Heads"
              : currentSide === "tails"
                ? "🙃 Tails"
                : "---"}
          </Typography>

          <Button
            className="hover:cursor-pointer bg-slate-800 hover:bg-slate-950 mb-4 select-none"
            onClick={onFlip}
            disabled={isFlipping}
          >
            {isFlipping ? "Flipping..." : "Flip a Coin"}
          </Button>

          <div>
            <Typography as="span">Heads: {count.heads}</Typography>
            {" :|: "}
            <Typography as="span">Tails: {count.tails}</Typography>
          </div>
        </div>
      </section>

      <Link
        to="https://github.com/chrsolr/noopcall.dev/blob/main/src/pages/flip-a-coin.tsx"
        isExternal
        className="inline-block text-sm text-slate-400 hover:underline"
      >
        View Source Code
      </Link>
    </div>
  );
}

export { FlipACoin };
