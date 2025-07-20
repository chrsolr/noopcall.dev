import { Link } from "./components/ui/link";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <section className="text-center">
        <h3>noopcall.dev</h3>
        <p>christiansoler</p>
        <Link href="https://github.com/chrsolr" target="_blank">
          github
        </Link>
      </section>
    </div>
  );
}

export default App;
