import { Route, Routes } from "react-router-dom";
import { NavBar } from "@/components/ui/nav";
import Home from "@/pages/home";
import { Blog } from "@/pages/blog";
import { AoC } from "./pages/aoc";
import { BinaryClock } from "./pages/binary-clock";
import { MouseSens } from "./pages/mouse-sens";

function App() {
  return (
    <main className="flex flex-col pb-8">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/advent-of-code" element={<AoC />} />
        <Route path="/binary-clock" element={<BinaryClock />} />
        <Route path="/mouse-sens" element={<MouseSens />} />
      </Routes>
    </main>
  );
}

export default App;
