import { Component, Module } from "../model";
import { componentRegistry } from "./registry";

export const ModuleRenderer = ({ module }: { module: Module }) => {
    return (
        <div className="flex flex-col gap-4">
            {module.components.map((comp: Component) => {
                const Block = componentRegistry[comp.type as keyof typeof componentRegistry];
                if (!Block) return null;

                return <Block key={comp.id} data={comp as never} />;
            })}
             <hr className='h-0.5 bg-gray-100 text-transparent' />
        </div>
    );
}; 