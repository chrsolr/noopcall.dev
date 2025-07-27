import { Route, Routes } from "react-router-dom";
import { NavBar } from "@/components/ui/nav";
import { Home } from "@/pages/home";
import { Blog } from "@/pages/blog";
import { AoC } from "./pages/aoc";
import { BinaryClock } from "./pages/binary-clock";
import { MouseSens } from "./pages/mouse-sens";
import { FlipACoin } from "./pages/flip-a-coin";
import { RandomPicker } from "./pages/random-picker";

function App() {
  return (
    <main className="flex flex-col pb-8">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/advent-of-code" element={<AoC />} />
        <Route path="/mouse-sens" element={<MouseSens />} />
        <Route path="/apps/binary-clock" element={<BinaryClock />} />
        <Route path="/apps/flip-a-coin" element={<FlipACoin />} />
        <Route path="/apps/random-picker" element={<RandomPicker />} />
      </Routes>
    </main>
  );
}

export default App;
