import React from 'react';
import { BuilderAddonComponent } from '../registry';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useBuilderStore } from '../../store/builder.store';
import { Plus, Save, Trash2 } from 'lucide-react';
import { Value } from 'three/examples/jsm/inspector/ui/Values.js';
import { DefaultAddons } from '@/features/configurator/model';

type AddonBuilderBlock = { data: BuilderAddonComponent, moduleId: string, defaultOpt: DefaultAddons };

const AddonBuilderBlock = ({ data, moduleId, defaultOpt }: AddonBuilderBlock) => {

    const updateAddonOption = useBuilderStore(s => s.updateAddonOption);
    const deleteAddonOption = useBuilderStore(s => s.deleteAddonOption);
    const addAddonOption = useBuilderStore(s => s.addAddonOption);
    const updateCheckOption = useBuilderStore(s => s.updateCheckOption);
    const saveDraft = useBuilderStore(s => s.saveDraft); 
    const saving = useBuilderStore(s => s.saving); 
    console.log(defaultOpt)

    const onAddClickHandler = () => {
        const option = {
            id: crypto.randomUUID(),
            value: "new addon",
            label: "new addon",
            price: 0
        }
        addAddonOption(moduleId, option);
    }

    console.log(data)
    return (


        <div className="overflow-x-auto">
            <table className="w-full text-sm border rounded-md">
                <thead className="bg-muted">
                    <tr>
                        <th className="p-2 text-left">ID</th>
                        <th className="p-2 text-left">Value</th>
                        <th className="p-2 text-left">Label</th>
                        <th className="p-2 text-left">Price</th>
                        <th className="p-2 text-center">Chkd</th>
                        <th className="p-2 text-center">Del</th>
                    </tr>
                </thead>

                <tbody>
                    {data.options.map((opt) => (
                        <tr key={opt.id} className="border-t">
                            {/* ID (readonly) */}
                            <td className="p-2 text-xs text-muted-foreground">
                                <div className="w-14 truncate">
                                    {opt.id}
                                </div>
                            </td>

                            {/* VALUE */}
                            <td className="p-2">
                                <Input
                                    value={opt.value}
                                    onChange={(e) =>
                                        updateAddonOption(moduleId, opt.id, { value: e.target.value })
                                    }
                                />
                            </td>

                            {/* LABEL */}
                            <td className="p-2">
                                <Input
                                    value={opt.label}
                                    onChange={(e) =>
                                        updateAddonOption(moduleId, opt.id, { label: e.target.value })
                                    }
                                />
                            </td>

                            {/* PRICE */}
                            <td className="p-2 w-30">
                                <Input
                                    type="number"
                                    value={opt.price ?? 0}
                                    onChange={(e) =>
                                        updateAddonOption(moduleId, opt.id, {
                                            price: Number(e.target.value),
                                        })
                                    }
                                />
                            </td>

                            {/* CHECKED */}
                            <td className="p-2 text-center">
                                <Checkbox
                                    checked={defaultOpt.selections.includes(opt.id)}

                                    onCheckedChange={() =>
                                        updateCheckOption(moduleId, opt.id, defaultOpt.selections.includes(opt.id))
                                    }
                                />
                            </td>

                            {/* DELETE */}
                            <td className="p-2 text-center">
                                <Button
                                    className="cursor-pointer"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => deleteAddonOption(moduleId, opt.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            <div className="flex items-center justify-between gap-2 p-3 bg-muted/40">
                {/* LEFT */}
                <div>
                    <Button
                        onClick={onAddClickHandler}
                        variant="default" size="sm" className="cursor-pointer">
                        <Plus className="w-4 h-4 mr-1" />
                        Add addon
                    </Button>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-2">
                    <Button
                        className="cursor-pointer"
                        // onClick={onDelete}
                        variant="destructive"
                        size="sm"
                    // disabled={disableDelete}
                    >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                    </Button>

                    <Button
                        className="cursor-pointer"
                        onClick={()=>saveDraft()}
                        variant="secondary"
                        size="sm"
                        disabled={saving}
                    >
                        <Save className="w-4 h-4 mr-1 cursor-pointer" />
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddonBuilderBlock;