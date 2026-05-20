import { getUserConfiguratorsAction } from "@/features/configurators/actions/dashboard.actions";
import { ConfiguratorRecord } from "@/features/configurators/types/configurators.types";
import ConfiguratorTable from "@/features/dashboard/configurators/ConfiguratorTable";

const ConfiguratorDashboardDTO = (configurators: ConfiguratorRecord[]) => {
  if (!configurators || configurators.length === 0)
    return [];

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return configurators.map(({ data, is_public, thumbnail_url, ...rest }) => {
    return {
      id: rest.id,
      name: rest.name,
      created_at: dateFormatter.format(new Date(rest.created_at)),
      updated_at: dateFormatter.format(new Date(rest.updated_at)),
      thumbnail_url: thumbnail_url ?? undefined,
      status: is_public ? ("published" as const) : ("draft" as const),
    };
  });
}
const Configurators = async () => {
  const configurators = await getUserConfiguratorsAction();
  return (
    <ConfiguratorTable configurators={ConfiguratorDashboardDTO(configurators)} />
  )
};

export default Configurators;