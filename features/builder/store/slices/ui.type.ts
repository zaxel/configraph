export type ActiveBuilderTab = "mesh" | "builder";

export type UiSlice = {
    activeTab: ActiveBuilderTab; 
    setActiveTab: (name: ActiveBuilderTab) => void; 
    saving: boolean;
    setSaving: (status: boolean) => void; 
}