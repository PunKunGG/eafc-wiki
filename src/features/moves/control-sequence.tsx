import type { GuideEntry } from "./catalog";
import type { ControllerPlatform } from "./types";
import { buttonLabels, controlSteps, type ControlAction, type ControlButton } from "./control-data";

type Props = { guide: GuideEntry; platform: ControllerPlatform; language: "th" | "en" };
const arrows = { right: "→", left: "←", up: "↑", down: "↓" } as const;
const directions = { right: ["ขวา", "right"], left: ["ซ้าย", "left"], up: ["ขึ้น", "up"], down: ["ลง", "down"] } as const;

function label(action: ControlAction, platform: ControllerPlatform, en: boolean) {
  const symbols: Partial<Record<ControlButton, [string, string]>> = { shoot: ["วงกลม", "circle"], pass: ["กากบาท", "cross"], lob: ["สี่เหลี่ยม", "square"], through: ["สามเหลี่ยม", "triangle"] };
  const button = action.button === "right-stick" ? (en ? "right stick" : "อนาล็อกขวา") : platform === "playstation" && symbols[action.button] ? symbols[action.button]![en ? 1 : 0] : buttonLabels[platform][action.button];
  const verb = { press: en ? "Press" : "กด", hold: en ? "Hold" : "ค้าง", flick: en ? "Flick" : "สะบัด", power: en ? "Set power with" : "ตั้งพลังด้วย", "press-again": en ? "Press again" : "กดซ้ำ" }[action.action];
  return `${verb} ${button}${action.direction ? ` ${directions[action.direction][en ? 1 : 0]}` : ""}${action.quick ? (en ? " quickly" : " ติดกันอย่างรวดเร็ว") : ""}`;
}

function buttonColor(action: ControlAction, platform: ControllerPlatform): string {
  const colors: Partial<Record<ControlButton, string>> = platform === "xbox"
    ? { shoot: "text-red-300", pass: "text-green-300", lob: "text-blue-300", through: "text-yellow-300" }
    : { shoot: "text-red-300", pass: "text-blue-300", lob: "text-pink-300", through: "text-green-300" };
  return colors[action.button] ?? "text-accent";
}

export function ControlSequence({ guide, platform, language }: Props) {
  const en = language === "en";
  const steps = controlSteps[guide.slug];
  if (!steps) return <p className="mt-4 rounded-md bg-background px-3 py-2 text-xs leading-5 text-muted">{en ? "Check the controls for your controller in the in-game help menu." : "ดูปุ่มตามจอยที่เลือกในเมนูช่วยเหลือในเกม"}</p>;
  return (
    <div>
    <ol className="mt-4 flex flex-wrap items-center gap-2" aria-label={en ? "Control steps" : "ขั้นตอนการกด"}>
      {steps.map((step, index) => (
        <li key={index} className="flex flex-wrap items-center gap-2">
          {index > 0 && <span className="text-sm text-muted">{en ? "then" : "แล้ว"}{steps[0].some((action) => action.action === "hold") ? (en ? " (keep holding)" : " (ค้างต่อ)") : ""}</span>}
          {step.map((action, actionIndex) => (
            <span key={actionIndex} className="flex items-center gap-1">
              {actionIndex > 0 && <><span aria-hidden="true" className="text-muted">+</span><span className="sr-only">{en ? "at the same time" : "พร้อมกัน"}</span></>}
              <span className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-sm">
                <span className="sr-only">{label(action, platform, en)}</span>
                <span aria-hidden="true" className="text-xs text-muted">{{press: en ? "Press" : "กด", hold: en ? "Hold" : "ค้าง", flick: en ? "Flick" : "สะบัด", power: en ? "Power" : "ตั้งพลัง", "press-again": en ? "Again" : "กดซ้ำ"}[action.action]}</span>
                <span aria-hidden="true" className={`min-w-6 rounded border border-current px-1 text-center font-bold ${buttonColor(action, platform)}`}>{buttonLabels[platform][action.button]}{action.direction && arrows[action.direction]}</span>
                {action.quick && <span aria-hidden="true" className="text-xs text-muted">{en ? "quickly" : "เร็ว"}</span>}
              </span>
            </span>
          ))}
        </li>
      ))}
    </ol>
    {steps.some((step) => step.some((action) => action.button === "right-stick")) && <p className="mt-2 text-xs text-muted">{en ? "R = right stick" : "R = อนาล็อกขวา"}</p>}
    </div>
  );
}
