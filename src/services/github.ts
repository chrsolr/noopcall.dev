export async function getAoCReadme(): Promise<string | undefined> {
  return fetch(
    "https://raw.githubusercontent.com/chrsolr/advent-of-code/refs/heads/main/README.md",
  )
    .then((res) => res.text())
    .catch((err) => {
      console.error(err);
      return undefined;
    });
}
