import { AddonComponent, Component, ContentComponent, Module, OptionsComponent, Product, SizeComponent } from "@/features/configurator/model";
import { PublishIssue, ZodIssueRaw } from "./types";

export function remapZodIssuePaths(
    issues: ZodIssueRaw[],
    draft: Product
): PublishIssue[] {
    return issues.map((issue) => remapIssue(issue, draft));
}

function remapIssue(issue: ZodIssueRaw, draft: Product): PublishIssue {
    const segs = issue.path.map(String); // normalise numbers → strings
    const out: string[] = [];
    let moduleId: string | undefined;
    let i = 0;

    while (i < segs.length) {
        const seg = segs[i];

        // ── modules.<index> ──────────────────────────────────────────────────────
        if (seg === "modules" && isIndex(segs[i + 1])) {
            const mod = draft.modules[Number(segs[i + 1])];
            const stableId = mod?.instanceId ?? fallback("module", segs[i + 1]);
            moduleId = stableId;
            out.push("modules", stableId);
            i += 2;
            continue;
        }

        // ── components.<index> ──────────────────────────────────────────────────
        if (seg === "components" && isIndex(segs[i + 1])) {
            const mod = resolveModule(out, draft);
            const comp = mod?.components[Number(segs[i + 1])];
            out.push("components", comp?.id ?? fallback("component", segs[i + 1]));
            i += 2;
            continue;
        }

        // ── Delegate to per-type resolvers once we know the component ────────────
        const comp = resolveComponent(out, draft);

        if (comp) {
            const consumed = resolveComponentSegment(comp, segs, i, out);
            if (consumed > 0) {
                i += consumed;
                continue;
            }
        }

        // ── Fallthrough: pass segment unchanged ──────────────────────────────────
        out.push(seg);
        i += 1;
    }

    return {
        code: issue.code,
        message: issue.message,
        severity: issue.severity,
        path: out.join("."),
        moduleId,
    };
}

function resolveComponentSegment(
  comp: Component,
  segs: string[],
  i: number,
  out: string[]
): number {
  switch (comp.type) {
    case "size":
      return resolveSizeSegment(comp, segs, i, out);
    case "parts":
      return resolvePartsSegment(comp, segs, i, out);
    case "content":
      return resolveContentSegment(comp, segs, i, out);
    case "addon":
      return resolveAddonSegment(comp, segs, i, out);
    // canvas / price / submit have no nested stable IDs to remap
    default:
      return 0;
  }
}

function resolveSizeSegment(
  comp: { type: "size"; options: SizeComponent["options"] },
  segs: string[],
  i: number,
  out: string[]
): number {
  if (segs[i] === "options" && isIndex(segs[i + 1])) {
    const opt = comp.options[Number(segs[i + 1])];
    out.push("options", opt?.id ?? fallback("size-option", segs[i + 1]));
    return 2;
  }
  return 0;
}

function resolveAddonSegment(
  comp: { type: "addon"; options: AddonComponent["options"] },
  segs: string[],
  i: number,
  out: string[]
): number {
  if (segs[i] === "options" && isIndex(segs[i + 1])) {
    const opt = comp.options[Number(segs[i + 1])];
    out.push("options", opt?.id ?? fallback("addon-option", segs[i + 1]));
    return 2;
  }
  return 0;
}

function resolveContentSegment(
  comp: { type: "content"; content: ContentComponent["content"] },
  segs: string[],
  i: number,
  out: string[]
): number {
  if (segs[i] === "content" && isIndex(segs[i + 1])) {
    const item = comp.content[Number(segs[i + 1])];
    out.push("content", item?.id ?? fallback("content-item", segs[i + 1]));
    return 2;
  }
  return 0;
}

function resolvePartsSegment(
  comp: { type: "parts"; options: OptionsComponent[] },
  segs: string[],
  i: number,
  out: string[]
): number {
  if (segs[i] !== "options" || !isIndex(segs[i + 1])) return 0;
 
  const opt = comp.options[Number(segs[i + 1])];
  out.push("options", opt?.id ?? fallback("part-option", segs[i + 1]));
  let consumed = 2;
 
  // options.<index>.groups.<index>
  if (segs[i + consumed] === "groups" && isIndex(segs[i + consumed + 1])) {
    const group = opt?.groups[Number(segs[i + consumed + 1])];
    out.push("groups", group?.id ?? fallback("group", segs[i + consumed + 1]));
    consumed += 2;
 
    // options.<index>.groups.<index>.colors.variants.<index>
    if (
      segs[i + consumed] === "colors" &&
      segs[i + consumed + 1] === "variants" &&
      isIndex(segs[i + consumed + 2])
    ) {
      const variant = group?.colors?.variants?.[Number(segs[i + consumed + 2])];
      out.push(
        "colors",
        "variants",
        variant?.id ?? fallback("variant", segs[i + consumed + 2])
      );
      consumed += 3;
    }
  }
 
  return consumed;
}

function resolveModule(out: string[], draft: Product): Module | undefined {
  const idx = out.lastIndexOf("modules");
  if (idx === -1) return undefined;
  const instanceId = out[idx + 1];
  return draft.modules.find((m) => m.instanceId === instanceId);
}
 
/** Walk the already-remapped output to find the current component. */
function resolveComponent(out: string[], draft: Product): Component | undefined {
  const mod = resolveModule(out, draft);
  if (!mod) return undefined;
  const idx = out.lastIndexOf("components");
  if (idx === -1) return undefined;
  const compId = out[idx + 1];
  return mod.components.find((c) => c.id === compId);
}

function isIndex(seg: string | undefined): seg is string {
  return seg !== undefined && /^\d+$/.test(seg);
}
 
/** Produce a clearly readable sentinel when a lookup fails. */
function fallback(kind: string, index: string): string {
  return `unknown_${kind}[${index}]`;
}