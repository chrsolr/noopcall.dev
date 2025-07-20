import { Link } from "./components/ui/link";
import { Typography } from "./components/ui/typography";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center ">
      <section className="text-center">
        <Typography as="h1" className="text-3xl font-semibold lowercase">
          <span className="text-rose-400">noop</span>
          <span className="text-amber-300">call</span>
          <span className="text-violet-300">.dev</span>
        </Typography>

        <p>christiansoler</p>

        <Link href="https://github.com/chrsolr" target="_blank">
          github
        </Link>
      </section>
    </div>
  );
}

export default App;
