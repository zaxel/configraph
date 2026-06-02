import { BuilderHeader } from "@/features/builder/ui/components/BuilderHeader";

export default function ConfiguratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <BuilderHeader />

      {/* <main className="flex-1 overflow-y-auto"> */}
      <main className="flex-1">
        <div className="p-2 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}