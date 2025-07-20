import { Link } from "@/components/ui/link";
import { Typography } from "@/components/ui/typography";

function home() {
  return (
    <div className="flex min-h-[calc(100svh-50px)] flex-col items-center justify-center ">
      <section className="text-center">
        <Typography as="h1" className="text-3xl font-medium lowercase">
          <span className="text-rose-400">noop</span>
          <span className="text-amber-300">call</span>
          <span className="text-violet-300">.dev</span>
        </Typography>

        <p>christiansoler</p>

        <Link to="https://github.com/chrsolr" target="_blank">
          github
        </Link>
      </section>
    </div>
  );
}

export default home;
