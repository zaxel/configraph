export type ActiveBuilderTab = "mesh" | "builder" | "settings";

export type UiSlice = {
    activeTab: ActiveBuilderTab; 
    setActiveTab: (name: ActiveBuilderTab) => void; 
    saving: boolean;
    setSaving: (status: boolean) => void; 
}