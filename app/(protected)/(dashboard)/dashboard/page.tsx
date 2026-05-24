import { getUserConfiguratorsAction } from "@/features/configurators/actions/dashboard.actions";
import { ConfiguratorRecord } from "@/features/configurators/types/configurators.types";
import DashboardOverview from "@/features/dashboard/components/DashboardOverview";
import { getRelativeTimeString } from "@/lib/getRelativeTimeString";

const ConfiguratorDashboardOverviewDTO = (configurators: ConfiguratorRecord[]) => {
    if (!configurators || configurators.length === 0)
        return [];

    const lastThreeConfigurators = [...configurators]
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        .slice(0, 3);

    return lastThreeConfigurators.map(({ is_public, thumbnail_url, ...rest }) => {

        return {
            id: rest.id,
            name: rest.name,
            updated_at: getRelativeTimeString(rest.updated_at),
            thumbnail_url: thumbnail_url ?? undefined,
            status: is_public ? ("Published" as const) : ("Draft" as const),
        };
    });
}

const Overview = async () => {
    const configurators = await getUserConfiguratorsAction();

    return (
        <DashboardOverview configurators={ConfiguratorDashboardOverviewDTO(configurators)} />
    );
};

export default Overview;