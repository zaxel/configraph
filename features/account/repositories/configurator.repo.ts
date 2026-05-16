// create()
// update()
// delete()
// getById()
// getBySlug()
// getByUser() 

// publish()
// getPublicConfigurator()
// getEditableConfigurator()

import { supabase } from "@/lib/supabase/client";
import { ConfiguratorData, ConfiguratorRecord } from "../types/configurators.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { MeshLayout } from "@/lib/extractMeshes";

export type UpdateConfiguratorInput = Partial<
    Pick<
        ConfiguratorRecord,
        "name" | "data" | "thumbnail_url" | "is_public"
    >
>;

export const createConfiguratorRepo = (
    supabase: SupabaseClient
) => ({
    async getById(
        id: string
    ): Promise<ConfiguratorRecord | null> {
        const { data, error } = await supabase
            .from("configurators")
            .select("*")
            .eq("id", id)
            .maybeSingle();

        if (error) {
            console.error(error);
            return null;
        }

        return data;
    },
    async getByClerkId(
        clerkId: string
    ): Promise<ConfiguratorRecord[] | null> {
        const { data, error } = await supabase
            .from("configurators")
            .select("*")
            .eq("clerk_user_id", clerkId)
            .order("updated_at", { ascending: false })

        if (error) {
            console.error(error);
            return null;
        }

        return data;
    },
    async getBySlug(
        slug: string,
        clerkId: string
    ): Promise<ConfiguratorRecord | null> {
        const { data, error } = await supabase
            .from("configurators")
            .select("*")
            .eq("clerk_user_id", clerkId)
            .eq("slug", slug)
            .maybeSingle();

        if (error) {
            console.error(error);
            return null;
        }

        return data;
    },
    async create(
        configuratorData: ConfiguratorData,
        clerkId: string,
        size: number,
        type: string,
        path: string,
    ) {
        const configuratorId = crypto.randomUUID();

        const defaultName = "Untitled Configurator";

        const newConfigurator = {
            clerk_user_id: clerkId,
            name: defaultName,
            slug: configuratorId.slice(0, 8),
            data: {
                draft: configuratorData.draft,
                published: configuratorData.published,
                builder_config: configuratorData.builderConfig,
            },
            thumbnail_url: null,
            is_public: false,
            model_path: path ?? null,
            model_format: type,
            model_size_bytes: size,
        };

        const { data, error } = await supabase
            .from("configurators")
            .insert(newConfigurator)
            .select()
            .single();

        if (error) throw error;

        return data;
    },

    async update(
        id: string,
        values: UpdateConfiguratorInput
    ) {
        const { data, error } = await supabase
            .from("configurators")
            .update(values)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;

        return data;
    },
    async updateMeshes(
        id: string,
        meshes: MeshLayout[]
    ) {
        const { data, error } = await supabase.rpc("update_meshes", {
            config_id: id,
            new_meshes: meshes,
        });

        if (error) throw error;

        return data;
    },
    async delete(
        id: string
    ) {
        const { data, error } = await supabase
            .from("configurators")
            .delete()
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;

        return data;
    },
});