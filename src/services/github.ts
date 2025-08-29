import orderBy from "lodash.orderby";

export type MouseSensitivity = {
  game: string;
  hip: number | string;
  ads: number | string;
  fov: number | null;
  dpi: number;
  cm_per_360: number | null;
  extras: string | null;
  mouse: string | null;
};

export type MouseSensitivityResponse = {
  Game: string;
  Hip: number | string;
  ADS: number | string;
  FOV: number | null;
  DPI: number;
  cm_per_360: number | null;
  Extras: string | null;
  Mouse: string | null;
};

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

export async function getMouseSens(): Promise<MouseSensitivity[] | undefined> {
  return fetch(
    "https://raw.githubusercontent.com/chrsolr/chrsolr/refs/heads/main/files/mouse-sens.json",
  )
    .then((res) => res.json())
    .then((sens) => {
      const ordered = sens
        ?.map((s: MouseSensitivityResponse) => ({
          game: s.Game,
          hip: s.Hip,
          ads: s.ADS,
          fov: s.FOV,
          dpi: s.DPI,
          cm_per_360: s.cm_per_360,
          extras: s.Extras,
          mouse: s.Mouse,
        }))
        .sort((a: MouseSensitivity, b: MouseSensitivity) => {
          if (a.game === "Windows") return -1;
          if (b.game === "Windows") return 1;
          return a.game.localeCompare(b.game);
        });

      return ordered;
    })
    .catch((err) => {
      console.error(err);
      return undefined;
    });
}
