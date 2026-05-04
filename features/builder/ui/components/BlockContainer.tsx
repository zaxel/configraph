import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDownIcon, GripVertical } from 'lucide-react';


const BlockContainer = ({ children, id }: {children: React.ReactNode, id: string}) => {
    return (
        <div className="border rounded-xl p-4 w-full">
            <Collapsible className="group">
                <div className="flex items-center gap-6">
                    <GripVertical className="w-4 h-4 mr-2 text-muted-foreground shrink-0 cursor-grab" />
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