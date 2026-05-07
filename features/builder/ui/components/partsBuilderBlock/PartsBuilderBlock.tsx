import React from 'react';
import { BuilderAddonComponent, BuilderPartsComponent, BuilderSizeComponent } from '../../registry';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useBuilderStore } from '../../../store/builder.store';
import { Plus, Save, Trash2 } from 'lucide-react';
import { DefaultParts } from '@/features/configurator/model';
import { inputHandlers } from '@/features/configurator/inputs';
import PartContainer from './PartContainer';
import GroupContainer from './GroupContainer';
import ColorTypeSelect from './ColorTypeSelect';

type PartsBuilderBlock = { data: BuilderPartsComponent, moduleId: string, defaultOpt: DefaultParts };

const PartsBuilderBlock = ({ data, moduleId, defaultOpt }: PartsBuilderBlock) => {

    console.log(data);

    const saveDraft = useBuilderStore(s => s.saveDraft);
    const saving = useBuilderStore(s => s.saving);
    const deleteModule = useBuilderStore(s => s.deleteModule);
    const setFieldDirty = useBuilderStore(s => s.setFieldDirty);
    const setFieldTouched = useBuilderStore(s => s.setFieldTouched);
    const validateField = useBuilderStore(s => s.validateField);



    const errors = useBuilderStore(s => s.errors);
    const touched = useBuilderStore(s => s.touched);

    const onAddClickHandler = () => {
        const option = {
            id: crypto.randomUUID(),
            value: "new size value",
            label: "new size label",
            price: 0
        }
        // addSizeOption(moduleId, option);
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
                                update: updateSizeTittle,
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
            <div className="flex flex-col gap-2">

            {data.options.map((opt) => {
                return <PartContainer key={opt.id} id={opt.id}>
                    {opt.groups.length > 0 && <p>variants:</p>}
                    {opt.groups.map(group => {
                        return <GroupContainer key={group.id} label={group.label}>


                            {/*MESHES TABLE*/}
                            <table className="w-full text-sm border rounded-md">
                                <thead className="bg-muted">
                                    <tr>
                                        <th className="p-2 text-left">Meshes</th>
                                        <th className="p-2 text-center">Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {group.meshes.map((mesh) => (
                                        <tr key={mesh} className="border-t">

                                            {/* MESHES */}
                                            <td className="p-2">
                                                {mesh}
                                            </td>

                                            {/* DELETE */}
                                            <td className="p-2 text-center">
                                                <Button
                                                    className="cursor-pointer"
                                                    variant="destructive"
                                                    size="sm"
                                                // onClick={() => deleteSizeOption(moduleId, opt.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div >
                                <Button
                                    // onClick={onAddClickHandler}
                                    variant="default" size="sm" className="cursor-pointer">
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add Mesh
                                </Button>
                            </div>




                            <ColorTypeSelect />






                            {/*COLORS TABLE*/}
                            <table className="w-full text-sm border rounded-md">
                                <thead className="bg-muted">
                                    <tr>
                                        <th className="p-2 text-left">UI</th>
                                        <th className="p-2 text-left">Value</th>
                                        <th className="p-2 text-left">Label</th>
                                        <th className="p-2 text-left">Price</th>
                                        <th className="p-2 text-center">Default</th>
                                        <th className="p-2 text-center">Del</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {group.colors?.variants?.map((color) => (
                                        <tr key={color.value} className="border-t">
                                            {/* UI */}
                                            <td className="p-2 text-xs text-muted-foreground">
                                                <div className="w-14 truncate">
                                                    UI
                                                </div>
                                            </td>
                                            {/* VALUE */}
                                            <td className="p-2">
                                                <Input
                                                    value={color.value}
                                                    onChange={(e) => {
                                                        const path = `modules.${moduleId}.components.${data.id}.groups.${group.id}.options.${color.value}.value`;
                                                        // setFieldDirty(path);
                                                        // inputHandlers["sizeOptionValue"]({
                                                        //     raw: e.target.value,
                                                        //     moduleId,
                                                        //     optionId: opt.id,
                                                        //     update: updateSizeOption,
                                                        // });
                                                    }}
                                                // onBlur={() => {
                                                //     const path = `modules.${moduleId}.components.${data.id}.groups.${group.id}.options.${color}.value`;
                                                //     setFieldTouched(path);
                                                //     validateField(path);
                                                // }}
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
                                                    value={color.label}
                                                    onChange={(e) => {
                                                        const path = `modules.${moduleId}.components.${data.id}.groups.${group.id}.options.${color.value}.value`;
                                                        // setFieldDirty(path);
                                                        // inputHandlers["sizeOptionLabel"]({
                                                        //     raw: e.target.value,
                                                        //     moduleId,
                                                        //     optionId: opt.id,
                                                        //     update: updateSizeOption,
                                                        // });
                                                    }}
                                                    onBlur={() => {
                                                        const path = `modules.${moduleId}.components.${data.id}.groups.${group.id}.options.${color.value}.value`;
                                                        setFieldTouched(path);
                                                        validateField(path);
                                                    }}
                                                />
                                                {(() => {
                                                    const path = `modules.${moduleId}.components.${data.id}.groups.${group.id}.options.${color.value}.value`;
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
                                                    value={color.price ?? 0}
                                                    onChange={(e) => {
                                                        const path = `modules.${moduleId}.components.${data.id}.groups.${group.id}.options.${color.value}.value`;
                                                        // setFieldDirty(path);
                                                        // inputHandlers["price"]({
                                                        //     raw: e.target.value,
                                                        //     moduleId,
                                                        //     optionId: opt.id,
                                                        //     update: updateSizeOption,
                                                        // });
                                                    }}
                                                    onBlur={() => {
                                                        const path = `modules.${moduleId}.components.${data.id}.groups.${group.id}.options.${color.value}.value`;
                                                        setFieldTouched(path);
                                                        validateField(path);
                                                    }}
                                                />
                                                {(() => {
                                                    const path = `modules.${moduleId}.components.${data.id}.groups.${group.id}.options.${color.value}.value`;
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

                                            {/* DEFAULT */}
                                            <td className="p-2 text-center">
                                                <Checkbox
                                                    checked={defaultOpt?.value === color.value || false}
                                                    onCheckedChange={() => {
                                                        const isSelected = defaultOpt && defaultOpt.value === color.value || false;
                                                        const patch = {
                                                            type: "part" as const,
                                                            value: color.value ?? "",
                                                            label: color.label ?? "",
                                                            price: color.price ?? 0,
                                                        }
                                                        // updateDefaultSize(moduleId, isSelected, patch)
                                                    }}
                                                />
                                            </td>

                                            {/* DELETE */}
                                            <td className="p-2 text-center">
                                                <Button
                                                    className="cursor-pointer"
                                                    variant="destructive"
                                                    size="sm"
                                                // onClick={() => deleteSizeOption(moduleId, opt.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>


                        </GroupContainer>
                    })}

                    {/*VARIANTS BUTTONS*/}
                    <div className="flex items-center justify-between gap-2 p-3 bg-muted/40">
                        {/* LEFT */}
                        <div>
                            <Button
                                // onClick={onAddClickHandler}
                                variant="default" size="sm" className="cursor-pointer">
                                <Plus className="w-4 h-4 mr-1" />
                                Add variant
                            </Button>
                        </div>

                        {/* RIGHT */}
                        <div className="flex items-center gap-2">
                            <Button
                                className="cursor-pointer"
                                // onClick={() => deleteModule(moduleId)}
                                variant="destructive"
                                size="sm"
                            >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete Variants
                            </Button>
                        </div>
                    </div>
                </PartContainer>
            })}
        </div>

            {/*MODULE BUTTONS*/}
            <div className="flex items-center justify-between gap-2 p-3 bg-muted/40">
                {/* LEFT */}
                <div>
                    <Button
                        onClick={onAddClickHandler}
                        variant="default" size="sm" className="cursor-pointer">
                        <Plus className="w-4 h-4 mr-1" />
                        Add part
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
                        Delete Module
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

export default PartsBuilderBlock;