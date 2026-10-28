export const MOVE_CATEGORIES = ["shooting", "passing", "celebration"] as const;
export type MoveCategory = (typeof MOVE_CATEGORIES)[number];

export type ControllerPlatform = "playstation" | "xbox";

export type ButtonInputStep = {
  kind: "buttons";
  /** Buttons in one step are pressed together. Separate array entries are ordered steps. */
  action: "press" | "hold" | "release";
  buttons: readonly [string, ...string[]];
  note?: string;
};

export type StickInputStep = {
  kind: "stick";
  stick: "left" | "right";
  motion: "flick" | "hold" | "rotate";
  direction: string;
  reference: "screen" | "player-facing";
  note?: string;
};

export type Move = {
  slug: string;
  game: "EA SPORTS FC 26";
  preset: "Classic";
  category: MoveCategory;
  title: { th: string; en: string };
  description: string;
  inputs: Record<ControllerPlatform, readonly (ButtonInputStep | StickInputStep)[]>;
  requirements: readonly string[];
  sources: readonly { label: string; url: string }[];
  verification:
    | { status: "draft"; checkedAt: null }
    | { status: "verified"; checkedAt: string };
};

export type VerifiedMove = Move & {
  verification: { status: "verified"; checkedAt: string };
};
