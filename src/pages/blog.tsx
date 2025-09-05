import { Link } from "@/components/ui/link";
import { Typography } from "@/components/ui/typography";
import orderBy from "lodash.orderby";

function Blog() {
  const posts = [
    {
      date: "April 4, 2016",
      title: "Show/Hide Bootstrap Navbar on Scroll",
      href: "https://github.com/chrsolr/chrsolr/blob/main/blog/show-hide-bootstrap-navbar-on-scroll.md",
    },
    {
      date: "March 23, 2016",
      title: "Animate Bootstrap Menu Icon To (X)",
      href: "https://github.com/chrsolr/chrsolr/blob/main/blog/animate-bootstrap-menu-icon-to-x.md",
    },
    {
      date: "July 11, 2015",
      title: "CoderCamps Bootcamp as a Student",
      href: "https://github.com/chrsolr/chrsolr/blob/main/blog/codercamps-bootcamp-as-a-student.md",
    },
    {
      date: "September 5, 2025",
      title: "From VS Code to Neovim: My Journey",
      href: "https://github.com/chrsolr/chrsolr/blob/main/blog/from-vscode-to-neovim-my-journey.md",
    },
  ];

  return (
    <div className="flex min-h-[calc(100svh-50px)] flex-col items-center justify-center ">
      <section className="text-center">
        <Typography as="h1" className="text-3xl font-medium lowercase">
          <span className="text-rose-400">latest</span>
          <span className="text-amber-300">post</span>
        </Typography>
      </section>

      <div>
        {orderBy(posts, ["date"], ["desc"]).map((post) => (
          <div key={post.title} className="flex flex-col p-4">
            <Typography as="p" className="font-medium">
              {post.date}
            </Typography>

            <Typography as="a" href={post.href} target="_blank">
              <Link to={post.href} target="_blank">
                {post.title}
              </Link>
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Blog };
