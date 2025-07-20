import { Route, Routes } from "react-router-dom";
import { NavBar } from "@/components/ui/nav";
import Home from "@/pages/home";
import { Blog } from "@/pages/blog";

function App() {
  return (
    <main className="flex flex-col">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </main>
  );
}

export default App;
