import Embed from "./Embed";
import EmbedLayout from "./layout";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<Record<string, string | string[]>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await params;
  await searchParams;

  return <EmbedLayout>
            <Embed />
        </EmbedLayout> 
}