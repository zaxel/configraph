import { StateCreator } from "zustand";
import { PublishSlice } from "./publish.types";
import { BoundBuilderStore } from "../builder.types";
import { validateForPublish } from "../../validation/publish/validateForPublish";
import { ProductSchema } from "../../validation/draft/product.schema";
import { PublishIssue } from "../../validation/publish/types";
import { mapPublishZodErrors } from "../../validation/publish/mapPublishZodErrors";

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

    const issues: PublishIssue[] = [];

    // structural validation
    const parsed = ProductSchema.safeParse(draft);

    if (!parsed.success) {
      issues.push(
        ...mapPublishZodErrors(parsed.error)
      );
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