import { Link } from "@/components/ui/link";
import { useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function NavBar() {
  const location = useLocation();

  return (
    <nav className="flex gap-4 justify-center items-center p-4 h-[50px]">
      <Link to="/" isActive={location.pathname === "/"}>
        home
      </Link>
      <Link to="/blog" isActive={location.pathname === "/blog"}>
        blog
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <span className="text-rose-400  hover:text-violet-300 active:text-amber-300 cursor-pointer no-underline relative link-decorated text-center">
            [:more:]
          </span>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="hover:bg-slate-800 bg-slate-800 border-none text-gray-100 justify-center text-center">
          <DropdownMenuLabel>Misc</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-900" />
          <DropdownMenuItem className="hover:!bg-slate-700 justify-center text-center">
            <Link
              isExternal
              rel="noopener noreferrer"
              to="/assets/files/resume.pdf"
              target="_blank"
            >
              resume
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}

export { NavBar };
