import type { ControllerPlatform } from "./types";

export type ControlButton = "shoot" | "pass" | "lob" | "through" | "l1" | "r1" | "l2" | "r2" | "right-stick";
export type ControlAction = { button: ControlButton; action: "press" | "hold" | "flick" | "power" | "press-again"; direction?: "right" | "up" | "down" | "left"; quick?: boolean };
/** Actions within a step happen together; successive steps happen in order. A hold continues through later steps. */
export type ControlStep = readonly ControlAction[];
const p = (button: ControlButton): ControlAction => ({ button, action: "press" });
const h = (button: ControlButton): ControlAction => ({ button, action: "hold" });
const stick = (action: "hold" | "flick", direction: "right" | "up" | "down" | "left"): ControlAction => ({ button: "right-stick", action, direction });
const power = (button: ControlButton): ControlAction => ({ button, action: "power" });
const again = (button: ControlButton): ControlAction => ({ button, action: "press-again" });
const low = (...modifiers: ControlButton[]): readonly ControlStep[] => [[...modifiers.map(h), power("shoot")], [again("shoot")]];
const double = (button: ControlButton): readonly ControlStep[] => [[p(button)], [again(button)]];

export const controlSteps: Readonly<Record<string, readonly ControlStep[]>> = {
  "regular-shot": [[p("shoot")]], "finesse-shot": [[p("r1"), p("shoot")]],
  "chip-shot": [[p("l1"), p("shoot")]], "power-shot": [[p("l1"), p("r1"), p("shoot")]],
  "low-driven-shot": low(), "low-driven-finesse-shot": low("r1"), "low-driven-power-shot": low("l1", "r1"),
  "ground-pass": [[p("pass")]], "through-pass": [[p("through")]], "lob-pass-cross": [[p("lob")]],
  "lobbed-through-pass": [[p("l1"), p("through")]], "driven-ground-pass": [[p("r1"), p("pass")]],
  "driven-through-pass": [[p("l1"), p("r1"), p("through")]],
  "lofted-ground-pass": double("pass"), "lofted-through-pass": double("through"),
  "driven-lob-pass": [[p("l1"), p("r1"), p("lob")]], "high-lob": [[p("l1"), p("lob")]],
  "ground-cross": double("lob"), "flair-pass": [[p("l2"), p("pass")]],
  "flair-lob": [[p("l2"), p("lob")]], "flair-through-pass": [[p("l2"), p("through")]],
  "pass-and-go": [[p("l1"), p("pass")]],
  "signature-celebration": [[p("pass")]], "random-celebration": [[p("shoot")]],
  "show-respect": [[h("l1"), p("shoot")], [{ ...again("shoot"), quick: true }]],
  "all-ears": [[h("l1"), p("through")]],
  "who-me": [[h("l1"), stick("hold", "right")]],
  "band-master": [[h("l1"), stick("flick", "right")], [stick("flick", "up")]],
  "cabaret": [[h("l2"), stick("hold", "up")]],
  "slides-and-kisses": [[h("r1"), stick("hold", "down")]],
};

export const buttonLabels: Record<ControllerPlatform, Record<ControlButton, string>> = {
  playstation: { shoot: "○", pass: "✕", lob: "□", through: "△", l1: "L1", r1: "R1", l2: "L2", r2: "R2", "right-stick": "R" },
  xbox: { shoot: "B", pass: "A", lob: "X", through: "Y", l1: "LB", r1: "RB", l2: "LT", r2: "RT", "right-stick": "R" },
};
