import React from 'react';
import { BuilderAddonComponent } from '../registry';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useBuilderStore } from '../../store/builder.store';
import { Plus, Save, Trash2 } from 'lucide-react';

const AddonBuilderBlock = ({ data, moduleId }: { data: BuilderAddonComponent, moduleId: string }) => {

    const updateAddonOption = useBuilderStore(s => s.updateAddonOption);

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
                                {opt.id}
                            </td>

                            {/* VALUE */}
                            <td className="p-2">
                                <Input
                                    value={opt.value}
                                    onChange={(e) =>
                                        updateAddonOption(moduleId, opt.id, { value: e.target.value })
                                        // onUpdate(opt.id, { value: e.target.value })
                                        // console.log("update value") 
                                    }
                                />
                            </td>

                            {/* LABEL */}
                            <td className="p-2">
                                <Input
                                    value={opt.label}
                                    onChange={(e) =>
                                        updateAddonOption(moduleId, opt.id, { label: e.target.value })
                                        // onUpdate(opt.id, { label: e.target.value })
                                        // console.log("update lable")
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
                                        // onUpdate(opt.id, {
                                        //     price: Number(e.target.value),
                                        // })
                                        // console.log("update price")
                                    }
                                />
                            </td>

                            {/* CHECKED */}
                            <td className="p-2 text-center">
                                <Checkbox
                                    // checked={!!opt.checked}
                                    checked={false}
                                    onCheckedChange={(val) =>
                                        updateAddonOption(moduleId, opt.id, { checked: !!val })
                                        // onUpdate(opt.id, { checked: !!val })
                                        // console.log("update")
                                    }
                                />
                            </td>

                            {/* DELETE */}
                            <td className="p-2 text-center">
                                <Button
                                    className="cursor-pointer"
                                    variant="destructive"
                                    size="sm"
                                    // onClick={() => updateAddonOption(data.id, opt.id, { checked: !!val })}
                                    // onClick={() => onDelete(opt.id)}
                                    onClick={() => console.log("delete")}
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
                    // onClick={onAdd} 
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
                        // onClick={onSave}
                        variant="secondary"
                        size="sm"
                        // disabled={disableSave}
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