import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDownIcon, GripVertical } from 'lucide-react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


const BlockContainer = ({ children, id, instanceId }: { children: React.ReactNode, id: string, instanceId: string }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: instanceId });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
    };

    return (
        <div className="border rounded-xl p-4 w-full relative group" ref={setNodeRef} style={style}>
            <Collapsible className="group">
                <div className="flex items-center" >

                    <Button
                        {...attributes}
                        {...listeners}
                        variant="ghost"
                        className="cursor-grab"
                    >
                        <GripVertical className="w-4 h-4 text-muted-foreground shrink-0 cursor-grab" />

                    </Button>

                    <CollapsibleTrigger asChild>
                        <Button
                            variant="ghost"
                            className="w-9/10 flex items-center justify-between"
                        >
                            <span className="text-lg font-semibold">
                                {id || "Block"}
                            </span>

                            <ChevronDownIcon className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                        </Button>
                    </CollapsibleTrigger>
                </div>

                <CollapsibleContent className="flex flex-col gap-2 pt-4 text-sm">
                    {children}
                </CollapsibleContent>
            </Collapsible>
        </div >
    );
};

export default BlockContainer;