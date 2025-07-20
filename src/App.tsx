import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/ui/nav";
import Home from "./pages/home";

function App() {
  return (
    <main className="flex flex-col">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  );
}

export default App;
