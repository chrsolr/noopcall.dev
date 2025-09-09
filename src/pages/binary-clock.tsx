import { Link } from "@/components/ui/link";
import { Typography } from "@/components/ui/typography";
import { useEffect, useState } from "react";

type BinaryClock = {
  hours: [number, number];
  minutes: [number, number];
  seconds: [number, number];
};

function getClockTimeLabel(timeAsDigits: BinaryClock) {
  const hours = timeAsDigits.hours.join("");
  const minutes = timeAsDigits.minutes.join("");
  const seconds = timeAsDigits.seconds.join("");
  return `${hours} : ${minutes} : ${seconds}`;
}

/**
 * Split an hour, minute or second to a tuple
 * e.g. 15 -> [1,5] || 5 -> [0,5]
 */
function splitDigitToTuple(digit: number): [number, number] {
  // convert digit to string and split into an array
  const split = digit
    .toString()
    .split("")
    .map((n) => +n);
  // check if digits is a single value digit
  const isSingleDigit = split.length === 1;
  // if digit is a single value, insert a 0 in position 0 of our tuple
  // else manually re-insert position 0 & 1,and discard any other value (safe guard).
  return [isSingleDigit ? 0 : split[0], isSingleDigit ? split[0] : split[1]];
}

/**
 * activeIndexes: 2 digit number
 */
function ColumnGroup({ activeIndexes }: { activeIndexes?: number }) {
  // default state for each pad component in the column group
  const defaultState = [false, false, false, false];

  // convert base10 number to base2 string.
  // e.g. 6 -> '110'
  activeIndexes
    ?.toString(2)
    // split string to array of strings
    .split("")
    // base2 strings are read from left to right and any starting zeroes and truncated. Therefore, 4 -> 100 and not 0100.
    // reverse array: ['1', '1', '0'] -> ['0', '1', '1']: Because we need count from bottom up
    .reverse()
    // forEach: chage default state index to true from every index containing a 1 in activeIndexes
    .forEach((v, i) => {
      defaultState[i] = v !== "0";
    });

  return (
    <div className="flex flex-col">
      {defaultState.reverse().map((value) => (
        <div
          className={`rounded-full m-2 w-[5vw] h-[5vw] ${value ? "bg-rose-400" : "bg-slate-950"}`}
        />
      ))}
    </div>
  );
}

function BinaryClock() {
  const [timeAsDigits, setTimeAsDigits] = useState<BinaryClock>({
    hours: [0, 0],
    minutes: [0, 0],
    seconds: [0, 0],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const currentTime = {
        hours: splitDigitToTuple(date.getHours()),
        minutes: splitDigitToTuple(date.getMinutes()),
        seconds: splitDigitToTuple(date.getSeconds()),
      };
      setTimeAsDigits(currentTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-[calc(100svh-50px)] flex-col container justify-center items-center mx-auto px-6">
      <section className="text-center">
        <Typography as="h1" className="text-3xl font-medium lowercase mb-8">
          <span className="text-rose-400">Binary</span>
          <span className="text-amber-300">Clock</span>
        </Typography>
      </section>

      <div className="flex flex-col items-center">
        <div className="flex gap-2">
          <div className="flex px-4 py-2">
            <ColumnGroup activeIndexes={timeAsDigits.hours[0]} />
            <ColumnGroup activeIndexes={timeAsDigits.hours[1]} />
          </div>

          <div className="flex p-4">
            <ColumnGroup activeIndexes={timeAsDigits.minutes[0]} />
            <ColumnGroup activeIndexes={timeAsDigits.minutes[1]} />
          </div>

          <div className="flex p-4">
            <ColumnGroup activeIndexes={timeAsDigits.seconds[0]} />
            <ColumnGroup activeIndexes={timeAsDigits.seconds[1]} />
          </div>
        </div>

        <Typography as="h2" className="text-2xl text-center mt-4 mb-8">
          {getClockTimeLabel(timeAsDigits)}
        </Typography>

        <Link
          to="https://github.com/chrsolr/noopcall.dev/blob/main/src/pages/binary-clock.tsx"
          isExternal
          className="inline-block text-sm text-slate-400 hover:underline"
        >
          View Source Code
        </Link>
      </div>
    </div>
  );
}

export { BinaryClock };
