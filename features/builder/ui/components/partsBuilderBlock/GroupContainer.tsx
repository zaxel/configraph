import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDownIcon } from 'lucide-react';


const GroupContainer = ({ children, label }: {children: React.ReactNode, label: string}) => {
    return (
        <div className="border rounded-xl p-4 w-full"> 
            <Collapsible className="group/variant" defaultOpen={false}>
                <div className="flex items-center gap-6">
                    <CollapsibleTrigger asChild>
                        <Button
                            variant="ghost"
                            className="w-9/10 flex items-center justify-between"
                        >
                            <span className="text-lg font-semibold">
                                {label || "group"}
                            </span>

                            <ChevronDownIcon className="h-4 w-4 transition-transform group-data-[state=open]/variant:rotate-180" />
                        </Button>
                    </CollapsibleTrigger>
                </div>

                <CollapsibleContent className="flex flex-col gap-6 pt-2 text-sm">
                    {children}
                </CollapsibleContent>
            </Collapsible>
        </div >
    );
};

export default GroupContainer;