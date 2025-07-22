import { Route, Routes } from "react-router-dom";
import { NavBar } from "@/components/ui/nav";
import Home from "@/pages/home";
import { Blog } from "@/pages/blog";
import { AoC } from "./pages/aoc";

function App() {
  return (
    <main className="flex flex-col">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/advent-of-code" element={<AoC />} />
      </Routes>
    </main>
  );
}

export default App;
