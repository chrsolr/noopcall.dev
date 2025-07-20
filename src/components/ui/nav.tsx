import { Link } from "@/components/ui/link";
import { useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();

  console.log(location);

  return (
    <nav className="flex gap-4 justify-center items-center p-4 h-[50px]">
      <Link to="/" isActive={location.pathname === "/"}>
        home
      </Link>
      :|:
      <Link to="/blog" isActive={location.pathname === "/blog"}>
        blog
      </Link>
      :|:
      <Link
        isExternal
        rel="noopener noreferrer"
        to="/assets/files/resume.pdf"
        target="_blank"
      >
        resume
      </Link>
    </nav>
  );
}

export { NavBar };
