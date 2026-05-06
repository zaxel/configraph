import React from 'react';
import { BuilderAddonComponent } from '../registry';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useBuilderStore } from '../../store/builder.store';
import { Plus, Save, Trash2 } from 'lucide-react';
import { DefaultAddons } from '@/features/configurator/model';
import { inputHandlers } from '@/features/configurator/inputs';

type AddonBuilderBlock = { data: BuilderAddonComponent, moduleId: string, defaultOpt: DefaultAddons };

const AddonBuilderBlock = ({ data, moduleId, defaultOpt }: AddonBuilderBlock) => {

    const updateAddonOption = useBuilderStore(s => s.updateAddonOption);
    const deleteAddonOption = useBuilderStore(s => s.deleteAddonOption);
    const addAddonOption = useBuilderStore(s => s.addAddonOption);
    const updateCheckOption = useBuilderStore(s => s.updateCheckOption);
    const saveDraft = useBuilderStore(s => s.saveDraft);
    const saving = useBuilderStore(s => s.saving);
    const deleteModule = useBuilderStore(s => s.deleteModule);
    const setFieldDirty = useBuilderStore(s => s.setFieldDirty);
    const setFieldTouched = useBuilderStore(s => s.setFieldTouched);
    const validateField = useBuilderStore(s => s.validateField);
    const updateAddonTittle = useBuilderStore(s => s.updateAddonTittle);

    const errors = useBuilderStore(s => s.errors);
    const touched = useBuilderStore(s => s.touched);

    const onAddClickHandler = () => {
        const option = {
            id: crypto.randomUUID(),
            value: "new addon",
            label: "new addon",
            price: 0
        }
        addAddonOption(moduleId, option);
    }
    return (
        <div className="overflow-x-auto">
            {/* CONTAINER TITLE */}
            <div className="flex gap-6 items-center">
                <p className="p-2 text-left">Component Title:</p>
                <div className="p-2">
                    <Input
                        value={data.label} 
                        onChange={(e) => {
                            const path = `modules.${moduleId}.components.${data.id}.label`;
                            setFieldDirty(path);
                            inputHandlers["containerLabel"]({
                                raw: e.target.value,
                                moduleId,
                                update: updateAddonTittle, 
                            });
                        }}
                        onBlur={() => {
                            const path = `modules.${moduleId}.components.${data.id}.label`;
                            setFieldTouched(path);
                            validateField(path);
                        }}
                    />
                    {(() => {
                        const path = `modules.${moduleId}.components.${data.id}.label`;
                        const fieldErrors = errors[path];
                        const isTouched = touched[path];
                        return isTouched && fieldErrors && fieldErrors.length > 0 ? (
                            <span className="text-red-500 text-xs">
                                {fieldErrors[0].message}
                            </span>
                        ) : null;
                    })()}
                </div>
            </div>
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
                                    onChange={(e) => {
                                        const path = `modules.${moduleId}.components.${data.id}.options.${opt.id}.value`;
                                        setFieldDirty(path);
                                        inputHandlers["addonOptionValue"]({
                                            raw: e.target.value,
                                            moduleId,
                                            optionId: opt.id,
                                            update: updateAddonOption,
                                        });
                                    }}
                                    onBlur={() => {
                                        const path = `modules.${moduleId}.components.${data.id}.options.${opt.id}.value`;
                                        console.log("blur", path)
                                        setFieldTouched(path);
                                        validateField(path);
                                    }}
                                />
                                {(() => {
                                    const path = `modules.${moduleId}.components.${data.id}.options.${opt.id}.value`;
                                    const fieldErrors = errors[path];
                                    const isTouched = touched[path];
                                    return isTouched && fieldErrors && fieldErrors.length > 0 ? (
                                        <span className="text-red-500 text-xs">
                                            {fieldErrors[0].message}
                                        </span>
                                    ) : null;
                                })()}
                            </td>

                            {/* LABEL */}
                            <td className="p-2">
                                <Input
                                    value={opt.label}
                                    onChange={(e) => {
                                        const path = `modules.${moduleId}.components.${data.id}.options.${opt.id}.label`;
                                        setFieldDirty(path);
                                        inputHandlers["addonOptionLabel"]({
                                            raw: e.target.value,
                                            moduleId,
                                            optionId: opt.id,
                                            update: updateAddonOption,
                                        });
                                    }}
                                    onBlur={() => {
                                        const path = `modules.${moduleId}.components.${data.id}.options.${opt.id}.label`;
                                        setFieldTouched(path);
                                        validateField(path);
                                    }}
                                />
                                {(() => {
                                    const path = `modules.${moduleId}.components.${data.id}.options.${opt.id}.label`;
                                    const fieldErrors = errors[path];
                                    const isTouched = touched[path];
                                    return isTouched && fieldErrors && fieldErrors.length > 0 ? (
                                        <span className="text-red-500 text-xs">
                                            {fieldErrors[0].message}
                                        </span>
                                    ) : null;
                                })()}
                            </td>

                            {/* PRICE */}
                            <td className="p-2 w-30">
                                <Input
                                    type="number"
                                    value={opt.price ?? 0}
                                    onChange={(e) => {
                                        const path = `modules.${moduleId}.components.${data.id}.options.${opt.id}.price`;
                                        setFieldDirty(path);
                                        inputHandlers["price"]({
                                            raw: e.target.value,
                                            moduleId,
                                            optionId: opt.id,
                                            update: updateAddonOption,
                                        });
                                    }}
                                    onBlur={() => {
                                        const path = `modules.${moduleId}.components.${data.id}.options.${opt.id}.price`;
                                        setFieldTouched(path);
                                        validateField(path);
                                    }}
                                />
                                {(() => {
                                    const path = `modules.${moduleId}.components.${data.id}.options.${opt.id}.price`;
                                    const fieldErrors = errors[path];
                                    const isTouched = touched[path];

                                    // Check if touched and if there is at least one error in the array
                                    return isTouched && fieldErrors && fieldErrors.length > 0 ? (
                                        <span className="text-red-500 text-xs">
                                            {fieldErrors[0].message}
                                        </span>
                                    ) : null;
                                })()}

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
                        onClick={() => deleteModule(moduleId)}
                        variant="destructive"
                        size="sm"
                    >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                    </Button>

                    <Button
                        className="cursor-pointer"
                        onClick={() => saveDraft()}
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