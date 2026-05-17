import { StateCreator } from "zustand";
import { PublishSlice } from "./publish.types";
import { BoundBuilderStore } from "../builder.types";
import { validateForPublish } from "../../validation/publish/validateForPublish";
import { ProductSchema } from "../../validation/draft/product.schema";
import { PublishIssue, ZodIssueRaw } from "../../validation/publish/types";
import { mapPublishZodErrors } from "../../validation/publish/mapPublishZodErrors";
import { buildPathResolver } from "../../validation/draft/buildPathResolver";
import { remapZodIssuePaths } from "../../validation/publish/remapZodIssuePaths";

export const createPublishSlice: StateCreator<
  BoundBuilderStore,
  [["zustand/devtools", never]],
  [],
  PublishSlice
> = (set, get) => ({
  publishIssues: [],

  publishing: false,

  validateBeforePublish: () => {
    const { draft, builderConfig } = get();

    if (!draft) return [];

    const zodIssues: ZodIssueRaw[] = [];

    // structural validation
    const parsed = ProductSchema.safeParse(draft);

    const issues: PublishIssue[] = [];

    if (!parsed.success) {
      zodIssues.push(
        ...mapPublishZodErrors(parsed.error)
      );
      const remapped = remapZodIssuePaths(zodIssues, draft);
      issues.push(...remapped);
    }

    // business validation
    issues.push(
      ...validateForPublish(
        draft,
        builderConfig
      )
    );

    set(
      { publishIssues: issues },
      false,
      "validateBeforePublish"
    );

    return issues;
  },

  publishConfigurator: async () => {
    const { draft } = get();

    if (!draft?.id) return;

    set(
      { publishing: true },
      false,
      "publishingStart"
    );

    try {
      const issues =
        get().validateBeforePublish();

      const hasErrors = issues.some(
        (i) => i.severity === "error"
      );

      if (hasErrors) {
        console.log(issues);
        alert(issues);
        return;
      }

      await fetch(
        `/api/configurator/${draft.id}/publish`,
        {
          method: "POST",
        }
      );
    } catch (e) {
      console.error(
        "Failed to publish",
        e
      );
    } finally {
      set(
        { publishing: false },
        false,
        "publishingEnd"
      );
    }
  },

  clearPublishIssues: () =>
    set({ publishIssues: [] }, false, "clearPublishIssues"),






});