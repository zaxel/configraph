"use client";

import {
  Download,
  ExternalLink,
  Receipt,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const invoices = [
  {
    id: "INV-2026-001",
    date: "May 12, 2026",
    amount: "$49.00",
    status: "Paid",
    plan: "Pro Plan",
  },

  {
    id: "INV-2026-002",
    date: "Apr 12, 2026",
    amount: "$49.00",
    status: "Paid",
    plan: "Pro Plan",
  },

  {
    id: "INV-2026-003",
    date: "Mar 12, 2026",
    amount: "$49.00",
    status: "Paid",
    plan: "Pro Plan",
  },
];

export default function BillingHistoryPage() {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Billing History
          </h1>

          <p className="mt-2 text-muted-foreground">
            Access invoices, receipts, and payment history.
          </p>
        </div>

        <Button
          variant="outline"
          className="rounded-2xl"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Open Billing Portal
        </Button>
      </section>

      {/* SUMMARY */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border bg-background p-6">
          <p className="text-sm text-muted-foreground">
            Current Plan
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Pro
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Renewing on June 12, 2026
          </p>
        </div>

        <div className="rounded-3xl border bg-background p-6">
          <p className="text-sm text-muted-foreground">
            Monthly Cost
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            $49
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Billed monthly
          </p>
        </div>

        <div className="rounded-3xl border bg-background p-6">
          <p className="text-sm text-muted-foreground">
            Total Paid
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            $147
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Last 3 billing cycles
          </p>
        </div>
      </section>

      {/* INVOICES */}
      <section className="overflow-hidden rounded-3xl border bg-background">
        <div className="border-b px-6 py-5">
          <h2 className="text-lg font-semibold">
            Invoices
          </h2>

          <p className="text-sm text-muted-foreground">
            Download receipts and review previous payments.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="border-b bg-muted/20">
              <tr className="text-left">
                <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                  Invoice
                </th>

                <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                  Date
                </th>

                <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                  Plan
                </th>

                <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                  Amount
                </th>

                <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">
                  Receipt
                </th>
              </tr>
            </thead>

            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b transition-colors hover:bg-muted/10"
                >
                  {/* INVOICE */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border bg-muted/30">
                        <Receipt className="h-4 w-4 text-muted-foreground" />
                      </div>

                      <div>
                        <p className="font-medium">
                          {invoice.id}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          Invoice Receipt
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* DATE */}
                  <td className="px-6 py-5 text-sm text-muted-foreground">
                    {invoice.date}
                  </td>

                  {/* PLAN */}
                  <td className="px-6 py-5 text-sm">
                    {invoice.plan}
                  </td>

                  {/* AMOUNT */}
                  <td className="px-6 py-5 text-sm font-medium">
                    {invoice.amount}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-5">
                    <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {invoice.status}
                    </div>
                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-5">
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        PDF
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPTY STATE */}
        {invoices.length === 0 && (
          <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
            <div className="mb-4 rounded-3xl border bg-muted/30 p-6">
              <Receipt className="h-8 w-8 text-muted-foreground" />
            </div>

            <h3 className="mb-2 text-xl font-semibold">
              No invoices yet
            </h3>

            <p className="max-w-md text-muted-foreground">
              Your billing history and receipts will appear
              here once you upgrade to a paid plan.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}