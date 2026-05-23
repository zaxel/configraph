"use client";
import { createContext, useContext, useState, useTransition } from "react";
import { Entitlements } from "../types/billing.types";


type EntitlementsProviderProps = {
    children: React.ReactNode,
    value: Entitlements,
    onRefresh: () => Promise<Entitlements>,

}

type BillingContextType = {
    refresh: () => Promise<void>;
    isPending: boolean;
    plan: Entitlements['plan'];
    usage: Entitlements['usage'];
    permissions: Entitlements['permissions'];
} | null;

const EntitlementsContext = createContext<BillingContextType>(null);

export function EntitlementsProvider({ children, value, onRefresh }: EntitlementsProviderProps) {
    const [entitlements, setEntitlements] = useState(value);
    const [isPending, startTransition] = useTransition();

    async function refresh() {
        startTransition(async () => {
            const fresh = await onRefresh(); // server action
            setEntitlements(fresh);
        });
    }

    return (
        <EntitlementsContext.Provider value={{ ...entitlements, refresh, isPending }}>
            {children}
        </EntitlementsContext.Provider>
    );
}

export function useEntitlements() {
    const context = useContext(EntitlementsContext);
    if (!context) {
        throw new Error("useEntitlements must be used within an EntitlementsProvider");
    }
    return context;
}