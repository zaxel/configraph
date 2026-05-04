import React from 'react';
import { BuilderAddonComponent } from '../registry';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useBuilderStore } from '../../store/builder.store';

const AddonBuilderBlock = ({ data, moduleId }: { data: BuilderAddonComponent }) => {

    const updateAddonOption = useBuilderStore(s => s.updateAddonOption);

    console.log(data)
    return (
        <div className="border rounded-xl p-4 space-y-4 w-full">
            <h3 className="text-lg font-semibold">{data.label || "Addons"}</h3>

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
            </div>
        </div>
    );
};

export default AddonBuilderBlock;