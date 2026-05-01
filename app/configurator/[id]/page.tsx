import Embed from "./Embed";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<Record<string, string | string[]>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await params;
  await searchParams;

  return <Embed />;
}