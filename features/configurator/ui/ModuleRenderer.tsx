import { Component, Module } from "../model";
import { componentRegistry } from "./registry";

export const ModuleRenderer = ({ module }: { module: Module }) => {
    return (
        <div>
            {module.components.map((comp: Component) => {
                // const Component = componentRegistry[comp.type];
                // if (!Component) return null;

                const Block = componentRegistry[comp.type as keyof typeof componentRegistry];
                if (!Block) return null;

                return <Block key={comp.id} data={comp as never} />;
            })}
        </div>
    );
};