"use client";

import Link from "next/link";
import {
  Copy,
  ExternalLink,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Configurator = {
  id: string;
  title: string;
  thumbnail?: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
};

export type ConfiguratorTableProps = {
  configurators: Configurator[];
};

export default function ConfiguratorTable({
  configurators,
}: ConfiguratorTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border bg-background">
      {/* HEADER */}
      <div className="flex flex-col gap-4 border-b px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            My Configurators
          </h2>

          <p className="text-sm text-muted-foreground">
            Manage, publish, and embed your 3D configurators.
          </p>
        </div>

        <Button
          asChild
          className="rounded-2xl"
        >
          <Link href="/builder">
            Create Configurator
          </Link>
        </Button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="border-b bg-muted/20">
            <tr className="text-left">
              <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                Configurator
              </th>

              <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                Status
              </th>

              <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                Created
              </th>

              <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                Updated
              </th>

              <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {configurators.map((configurator) => (
              <tr
                key={configurator.id}
                className="border-b transition-colors hover:bg-muted/10"
              >
                {/* CONFIGURATOR */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-2xl border bg-muted/30">
                      {configurator.thumbnail ? (
                        <img
                          src={configurator.thumbnail}
                          alt={configurator.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                          No Preview
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-medium">
                        {configurator.title}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        ID: {configurator.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* STATUS */}
                <td className="px-6 py-5">
                  <div
                    className={
                      configurator.status === "published"
                        ? "inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        : "inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                    }
                  >
                    {configurator.status === "published"
                      ? "Published"
                      : "Draft"}
                  </div>
                </td>

                {/* CREATED */}
                <td className="px-6 py-5 text-sm text-muted-foreground">
                  {configurator.createdAt}
                </td>

                {/* UPDATED */}
                <td className="px-6 py-5 text-sm text-muted-foreground">
                  {configurator.updatedAt}
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-5">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="rounded-xl"
                    >
                      <Link
                        href={`/builder/${configurator.id}`}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="rounded-xl"
                    >
                      <Link
                        href={`/configurator/${configurator.id}`}
                        target="_blank"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Open
                      </Link>
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-xl"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        className="w-52 rounded-2xl"
                      >
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Copy Embed Link
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="text-red-500 focus:text-red-500">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EMPTY STATE */}
      {configurators.length === 0 && (
        <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
          <div className="mb-4 rounded-3xl border bg-muted/30 p-6">
            <Pencil className="h-8 w-8 text-muted-foreground" />
          </div>

          <h3 className="mb-2 text-xl font-semibold">
            No configurators yet
          </h3>

          <p className="mb-6 max-w-md text-muted-foreground">
            Create your first 3D configurator and start embedding
            interactive product experiences.
          </p>

          <Button
            asChild
            className="rounded-2xl"
          >
            <Link href="/builder/new">
              Create Configurator
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}