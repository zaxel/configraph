// create()
// update()
// delete()
// getById()
// getBySlug()
// getByUser() 

// publish()
// getPublicConfigurator()
// getEditableConfigurator()

import { ConfiguratorData, ConfiguratorRecord } from "../types/configurators.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { MeshLayout } from "@/lib/extractMeshes";
import { Product } from "@/features/configurator/model";
import { ProductSchema } from "@/features/builder/validation/draft/product.schema";
import { validateForPublish } from "@/features/builder/validation/publish/validateForPublish";
import { PermissionValues } from "@/features/billing/types/billing.types";

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
        id: string,
        userId: string
    ): Promise<ConfiguratorRecord | null> {
        const { data, error } = await supabase
            .from("configurators")
            .select("*")
            .eq("id", id)
            .eq("clerk_user_id", userId)
            .maybeSingle();

        if (error) {
            console.error(error);
            return null;
        }

        return data;
    },
    async getByIdNoAuth(
        id: string,
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
        name?: string 
    ) {
        const configuratorId = configuratorData.id ?? crypto.randomUUID();

        const defaultName = "Untitled Configurator";

        const newConfigurator = {
            id: configuratorId,
            clerk_user_id: clerkId,
            name: name ?? defaultName,
            slug: configuratorId.slice(0, 8),
            data: {
                draft: { ...configuratorData.draft, id: configuratorId, },
                published: configuratorData.published,
                builder_config: configuratorData.builder_config,
            },
            thumbnail_url: null,
            is_public: Boolean(configuratorData.published),
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
    async updateDraft(
        id: string,
        draft: Product
    ) {
        const { data, error } = await supabase.rpc("update_draft", {
            config_id: id,
            new_draft: draft,
        });

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
    async publish(id: string, permissions: PermissionValues) {
        // 1. get configurator
        const { data, error } = await supabase
            .from("configurators")
            .select("*")
            .eq("id", id)
            .single();

        if (error) throw error;

        const draft = data.data.draft;
        const prevPublished = data.data.published;

        // 2. validate zod
        const parsed = ProductSchema.safeParse(draft);

        if (!parsed.success) {
            throw new Error("Draft invalid");
        }

        // 3. validate publish rules
        const issues = validateForPublish(
            draft,
            data.data.builder_config
        );

        const hasErrors = issues.some(
            (i) => i.severity === "error"
        );

        if (hasErrors) {
            throw new Error(
                "Configurator cannot be published"
            );
        }

        // 4. create immutable snapshot
        const publishedSnapshot = JSON.parse(
            JSON.stringify({
                schemaVersion: prevPublished ? prevPublished.schemaVersion + 1 : 1,
                publishedAt: Date.now(),
                data: draft,
                runtime: permissions
            })
        );

        // 5. update row
        const { error: updateError } = await supabase
            .from("configurators")
            .update({
                data: {
                    ...data.data,
                    published: publishedSnapshot,
                },

                is_public: true,
            })
            .eq("id", id);

        if (updateError) {
            throw updateError;
        }

        return publishedSnapshot;
    },
    async getAllUserConfigurators(userId: string) {
        // 1. get configurator
        const { data, error } = await supabase
            .from("configurators")
            .select("*")
            .eq("clerk_user_id", userId);

        if (error) throw error;
        return data;
    },
});