import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { wait } from "@/lib/utils";
import { useState } from "react";

const CONSTANTS = {
  MIN: 1,
  MAX: 40,
} as const;

function RandomPicker() {
  const [items, setItems] = useState<string[]>([]);
  const [currentValue, setCurrentValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [invalidItems, setInvalidItems] = useState<number[]>([]);

  const addOption = () => {
    if (!currentValue) {
      return;
    }

    const isDuplicate = items.some(
      (v) => v.toLocaleUpperCase() === currentValue.toLocaleUpperCase(),
    );

    if (isDuplicate) {
      return;
    }

    setItems([...items, currentValue]);
    setCurrentValue("");
    setInvalidItems([]);
    setSelectedItem(null);
  };

  const removeOption = (indexToRemove: number) => {
    const updatedItems = [...items];
    updatedItems.splice(indexToRemove, 1);

    setItems([...updatedItems]);
    setInvalidItems([]);
    setSelectedItem(null);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e?.currentTarget?.value ?? "";

    const isDuplicate = items.some(
      (v) => v.toLocaleUpperCase() === value.toLocaleUpperCase(),
    );

    if (!value || isDuplicate) {
      return;
    }

    if (e.key === "Enter") {
      setItems([...items, value]);
      setCurrentValue("");
      setInvalidItems([]);
      setSelectedItem(null);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value ?? "";
    setCurrentValue(value);
  };

  const onClear = () => {
    setCurrentValue("");
    setSelectedItem(null);
    setInvalidItems([]);
    setItems([]);
  };

  const onRoll = async () => {
    setIsProcessing(true);
    setInvalidItems([]);
    setSelectedItem(null);

    const usedIndices = new Set<number>();

    while (usedIndices.size < items.length - 1) {
      await wait(1000);

      let randomIndex: number;
      do {
        randomIndex = Math.floor(Math.random() * items.length);
      } while (usedIndices.has(randomIndex));

      usedIndices.add(randomIndex);

      setInvalidItems((prev) => [...prev, randomIndex]);
    }

    const remainingIndex = items.findIndex((_, i) => !usedIndices.has(i));
    setSelectedItem(items[remainingIndex]);
    setIsProcessing(false);
  };

  return (
    <div className="flex min-h-[calc(100svh-50px)] flex-col items-center justify-center select-none">
      <section className="text-center">
        <Typography as="h1" className="text-3xl font-medium lowercase">
          <span className="text-rose-400">Random</span>
          <span className="text-amber-300">Picker</span>
        </Typography>

        <Typography className="mt-4 text-lg">
          {isProcessing || !selectedItem ? "---" : "🎉 " + selectedItem + "!"}
        </Typography>

        <div className="flex mt-4">
          <Input
            className="border-none bg-slate-800 focus-visible:outline-none focus-visible:ring-0"
            type="text"
            placeholder="Add item..."
            min={CONSTANTS.MIN}
            max={CONSTANTS.MAX}
            value={currentValue}
            onChange={onChange}
            onKeyDown={onKeyDown}
            disabled={isProcessing}
          />
          <Button
            className="hover:cursor-pointer bg-slate-800 hover:bg-slate-950 mb-4 select-none ml-4"
            onClick={addOption}
            disabled={
              isProcessing ||
              !currentValue ||
              currentValue.length < CONSTANTS.MIN ||
              currentValue.length > CONSTANTS.MAX
            }
          >
            +
          </Button>
        </div>

        <div className="mt-4">
          {Boolean(items?.length) &&
            items.map((option, index) => (
              <div key={index.toString()} className="flex justify-between">
                {invalidItems.includes(index) ? (
                  <del className="text-pink-400">
                    <Typography>{option}</Typography>
                  </del>
                ) : selectedItem === option ? (
                  <Typography className="text-amber-300">{option}</Typography>
                ) : (
                  <Typography>{option}</Typography>
                )}
                <Button
                  className="hover:cursor-pointer bg-slate-800 hover:bg-slate-950 mb-4 select-none ml-4"
                  disabled={isProcessing}
                  onClick={() => {
                    removeOption(index);
                  }}
                >
                  -
                </Button>
              </div>
            ))}
        </div>

        <div className="flex mt-4 justify-center items-center gap-4">
          <Button
            className="hover:cursor-pointer bg-slate-800 hover:bg-slate-950 mb-4 select-none"
            onClick={onRoll}
            disabled={isProcessing || items.length === 0}
          >
            {isProcessing ? "Rolling..." : "Roll"}
          </Button>

          <Button
            className="hover:cursor-pointer bg-slate-800 hover:bg-slate-950 mb-4 select-none"
            onClick={onClear}
            disabled={!items.length || isProcessing}
          >
            Clear
          </Button>
        </div>
      </section>
    </div>
  );
}

export { RandomPicker };
