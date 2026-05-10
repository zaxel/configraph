import React from 'react';
import { BuilderPriceComponent } from '../registry';
import { Button } from '@/components/ui/button';
import { Save, Trash2 } from 'lucide-react';
import { useBuilderStore } from '../../store/builder.store';
import { inputHandlers } from '@/features/configurator/inputs';
import { ValidatedInput } from './ValidatedInput';

type PriceBuilderBlock = { data: BuilderPriceComponent, moduleId: string };

const PriceBuilderBlock = ({ data, moduleId }: PriceBuilderBlock) => { 
    const deleteModule = useBuilderStore(s => s.deleteModule);
    const setFieldDirty = useBuilderStore(s => s.setFieldDirty);
    const setFieldTouched = useBuilderStore(s => s.setFieldTouched);
    const validateField = useBuilderStore(s => s.validateField);

    const errors = useBuilderStore(s => s.errors);
    const touched = useBuilderStore(s => s.touched);

    const updatePriceTittle = useBuilderStore(s => s.updatePriceTittle);
    const updatePrice = useBuilderStore(s => s.updatePrice); 

    const saveDraft = useBuilderStore(s => s.saveDraft);
    const saving = useBuilderStore(s => s.saving);

    return (
        <div className="overflow-x-auto">
            <ValidatedInput
                label="Component Title:"
                value={data.label ?? ""}
                path={`modules.${moduleId}.components.${data.id}.label`}
                onChange={(value) => inputHandlers["containerLabel"]({ raw: value, moduleId, update: updatePriceTittle })}
                errors={errors}
                touched={touched}
                setFieldDirty={setFieldDirty}
                setFieldTouched={setFieldTouched}
                validateField={validateField}
            />

            <table className="w-full text-sm border rounded-md">
                <thead className="bg-muted">
                    <tr>
                        <th className="p-2 text-left">ID</th>
                        <th className="p-2 text-left">Base Price</th>
                        <th className="p-2 text-left">Old Price</th>
                    </tr>
                </thead>

                <tbody>
                        <tr key={data.id} className="border-t">
                            {/* ID (readonly) */}
                            <td className="p-2 text-xs text-muted-foreground">
                                <div className="w-14 truncate">
                                    {data.id}
                                </div>
                            </td>

                            {/* BASE PRICE */}
                            <ValidatedInput
                                type="number"
                                value={String(data.pricing?.basePrice ?? 0)}
                                path={`modules.${moduleId}.components.${data.id}.pricing.basePrice`}
                                onChange={(value) => inputHandlers["productPrice"]({
                                            raw: value,
                                            moduleId,
                                            type: "basePrice",
                                            update: updatePrice,
                                        })}
                                errors={errors}
                                touched={touched}
                                setFieldDirty={setFieldDirty}
                                setFieldTouched={setFieldTouched}
                                validateField={validateField}
                            />
                            
                            {/* OLD PRICE */}
                            <ValidatedInput
                                value={String(data.pricing?.oldPrice ?? 0)}
                                type="number"
                                path={`modules.${moduleId}.components.${data.id}.pricing.oldPrice`}
                                onChange={(value) => inputHandlers["productPrice"]({
                                            raw: value,
                                            moduleId,
                                            type: "oldPrice",
                                            update: updatePrice,
                                        })}
                                errors={errors}
                                touched={touched}
                                setFieldDirty={setFieldDirty}
                                setFieldTouched={setFieldTouched}
                                validateField={validateField}
                            />
                        </tr>
                </tbody>
            </table>

            <div className="flex items-center justify-end gap-2 p-3 bg-muted/40">

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

export default PriceBuilderBlock;