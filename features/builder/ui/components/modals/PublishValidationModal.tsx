"use client";

import {
  AlertTriangle,
  CircleAlert,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PublishIssue } from "../../../validation/publish/types";


type Props = {
  open: boolean;

  issues: PublishIssue[];

  publishing?: boolean;

  onClose: () => void;

  onPublish: () => void;
};

export function PublishValidationModal({
  open,
  issues,
  publishing,
  onClose,
  onPublish,
}: Props) {
  const errors = issues.filter(
    (i) => i.severity === "error"
  );

  const warnings = issues.filter(
    (i) => i.severity === "warning"
  );

  const hasErrors = errors.length > 0;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent className="max-w-2xl rounded-3xl p-0 overflow-hidden">
        {/* HEADER */}
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle className="flex items-center gap-3 text-xl">
            {hasErrors ? (
              <>
                <CircleAlert className="h-6 w-6 text-red-500" />
                Cannot publish yet
              </>
            ) : (
              <>
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
                Before publishing
              </>
            )}
          </DialogTitle>

          <DialogDescription className="pt-2 text-sm">
            {hasErrors
              ? "Fix the following errors before publishing your configurator."
              : "Your configurator can be published, but there are a few warnings you may want to review first."}
          </DialogDescription>

          {/* COUNTS */}
          <div className="mt-4 flex items-center gap-3">
            <div className="rounded-full bg-red-500/10 px-3 py-1 text-sm font-medium text-red-500">
              {errors.length} Error
              {errors.length !== 1 ? "s" : ""}
            </div>

            <div className="rounded-full bg-yellow-500/10 px-3 py-1 text-sm font-medium text-yellow-600">
              {warnings.length} Warning
              {warnings.length !== 1 ? "s" : ""}
            </div>
          </div>
        </DialogHeader>

        {/* CONTENT */}
        <ScrollArea className="max-h-[50vh] px-6 py-5">
          <div className="space-y-6">
            {/* ERRORS */}
            {errors.length > 0 && (
              <section>
                <div className="mb-3 flex items-center gap-2">
                  <CircleAlert className="h-5 w-5 text-red-500" />

                  <h3 className="text-sm font-semibold uppercase tracking-wide text-red-500">
                    Errors
                  </h3>
                </div>

                <div className="space-y-2">
                  {errors.map((issue, index) => (
                    <div
                      key={`${issue.message}-${index}`}
                      className="rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-3"
                    >
                      <div className="flex items-start gap-3">
                        <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />

                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            {issue.message}
                          </p>

                          {issue.moduleId && (
                            <p className="text-xs text-muted-foreground">
                              Module: {issue.moduleId}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* WARNINGS */}
            {warnings.length > 0 && (
              <section>
                <div className="mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />

                  <h3 className="text-sm font-semibold uppercase tracking-wide text-yellow-600">
                    Warnings
                  </h3>
                </div>

                <div className="space-y-2">
                  {warnings.map((issue, index) => (
                    <div
                      key={`${issue.message}-${index}`}
                      className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3"
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />

                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            {issue.message}
                          </p>

                          {issue.moduleId && (
                            <p className="text-xs text-muted-foreground">
                              Module: {issue.moduleId}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </ScrollArea>

        {/* FOOTER */}
        <DialogFooter className="border-t px-6 py-4">
          <div className="flex w-full items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-xl"
            >
              Close
            </Button>

            {!hasErrors && (
              <Button
                onClick={onPublish}
                disabled={publishing}
                className="rounded-xl"
              >
                {publishing
                  ? "Publishing..."
                  : "Publish anyway"}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}