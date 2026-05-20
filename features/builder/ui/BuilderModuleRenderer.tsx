import { Component, Module } from "@/features/configurator/model";
import { componentRegistry } from "./registry";
import BlockContainer from "./components/BlockContainer";

export const BuilderModuleRenderer = ({ module }: { module: Module }) => {
    return (
        <div className="flex flex-col gap-4">
            {module.components.map((comp: Component) => {
                const Block = componentRegistry[comp.type as keyof typeof componentRegistry];
                if (!Block) return null;

                return <BlockContainer key={comp.id} id={module.id} instanceId={module.instanceId}>
                    <Block data={comp as never} moduleId={module.instanceId} defaultOpt={module.default as never}/> 
                </BlockContainer>  
            })}
        </div>
    );
}; 