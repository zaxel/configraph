import { DefaultParts, meshGroup } from "@/features/configurator/model";
import { ValidatedInput } from "../ValidatedInput";
import { inputHandlers } from "@/features/configurator/inputs";
import { useBuilderStore } from "@/features/builder/store/builder.store";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

type ColorVariantsTable = {
    moduleId: string,
    componentId: string,
    optionId: string,
    group: meshGroup,
    defaultOpt: DefaultParts
}

const ColorVariantsTable = ({ moduleId, componentId, optionId, group, defaultOpt }: ColorVariantsTable) => {
    const errors = useBuilderStore(s => s.errors);
    const touched = useBuilderStore(s => s.touched);
    const setFieldDirty = useBuilderStore(s => s.setFieldDirty);
    const setFieldTouched = useBuilderStore(s => s.setFieldTouched);
    const validateField = useBuilderStore(s => s.validateField);

    const updatePartColor = useBuilderStore(s => s.updatePartColor);
    const updateDefaultPartColor = useBuilderStore(s => s.updateDefaultPartColor);
    const deleteColorOption = useBuilderStore(s => s.deleteColorOption);

    return (
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
                {group.colors?.variants?.map((color) => {
                    const valuePath = `modules.${moduleId}.components.${componentId}.options.${optionId}.groups.${group.id}.colors.variants.${color.id}.value`;
                    const labelPath = `modules.${moduleId}.components.${componentId}.options.${optionId}.groups.${group.id}.colors.variants.${color.id}.label`;
                    const pricePath = `modules.${moduleId}.components.${componentId}.options.${optionId}.groups.${group.id}.colors.variants.${color.id}.price`;

                    return (
                        <tr key={color.id} className="border-t">
                            {/* UI */}
                            <td className="p-2 text-xs text-muted-foreground">
                                <div className="w-14 truncate">
                                    <div
                                        style={{ backgroundColor: color.value ?? "gray" }}
                                        className="m-1 w-6 h-6 rounded-full ring-1 ring-gray-300 relative">
                                    </div>
                                </div>
                            </td>

                            {/* VALUE */}
                            <ValidatedInput
                                value={color.value ?? ""}
                                path={valuePath}
                                onChange={(value) => inputHandlers["updatePartsColorValue"]({ raw: value, moduleId, optionId: optionId, groupId: group.id, variantId: color.id, update: updatePartColor })}
                                errors={errors}
                                touched={touched}
                                setFieldDirty={setFieldDirty}
                                setFieldTouched={setFieldTouched}
                                validateField={validateField}
                            />

                            {/* LABEL */}
                            <ValidatedInput
                                value={color.label ?? ""}
                                path={labelPath}
                                onChange={(value) => inputHandlers["updatePartsColorLabel"]({ raw: value, moduleId, optionId: optionId, groupId: group.id, variantId: color.id, update: updatePartColor })}
                                errors={errors}
                                touched={touched}
                                setFieldDirty={setFieldDirty}
                                setFieldTouched={setFieldTouched}
                                validateField={validateField}
                            />

                            {/* PRICE */}
                            <ValidatedInput
                                value={String(color.price ?? 0)}
                                path={pricePath}
                                onChange={(value) => inputHandlers["updatePartsColorPrice"]({ raw: value, moduleId, optionId: optionId, groupId: group.id, variantId: color.id, update: updatePartColor })}
                                errors={errors}
                                touched={touched}
                                setFieldDirty={setFieldDirty}
                                setFieldTouched={setFieldTouched}
                                validateField={validateField}
                                className={"w-30"}
                            />



                            {/* DEFAULT */}
                            <td className="p-2 text-center">
                                <Checkbox
                                    checked={defaultOpt?.selections[optionId]?.color === color.value}
                                    onCheckedChange={() => {
                                        const isSelected = defaultOpt?.selections[optionId]?.color === color.value || false;
                                        updateDefaultPartColor(moduleId, optionId, color.value, isSelected)
                                    }}
                                />
                            </td>

                            {/* DELETE */}
                            <td className="p-2 text-center">
                                <Button
                                    className="cursor-pointer"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => deleteColorOption(moduleId, optionId, group.id, color.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
};

export default ColorVariantsTable;