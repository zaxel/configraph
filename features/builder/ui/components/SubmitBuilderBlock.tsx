import React from 'react';
import { BuilderSubmitComponent } from '../registry';
import { Button } from '@/components/ui/button';
import { Save, Trash2 } from 'lucide-react';
import { useBuilderStore } from '../../store/builder.store';
import { inputHandlers } from '@/features/configurator/inputs';
import { ValidatedInput } from './ValidatedInput';

type SubmitBuilderBlock = { data: BuilderSubmitComponent, moduleId: string };

const SubmitBuilderBlock = ({ data, moduleId }: SubmitBuilderBlock) => {
    const deleteModule = useBuilderStore(s => s.deleteModule);
    const setFieldDirty = useBuilderStore(s => s.setFieldDirty);
    const setFieldTouched = useBuilderStore(s => s.setFieldTouched);
    const validateField = useBuilderStore(s => s.validateField);

    const errors = useBuilderStore(s => s.errors);
    const touched = useBuilderStore(s => s.touched);

    const updateSubmitTittle = useBuilderStore(s => s.updateSubmitTittle);
    const updateSubmitText = useBuilderStore(s => s.updateSubmitText); 


    const saveDraft = useBuilderStore(s => s.saveDraft);
    const saving = useBuilderStore(s => s.saving);


    return (
        <div className="overflow-x-auto">
            <ValidatedInput
                label="Component Title:"
                value={data.label ?? ""}
                path={`modules.${moduleId}.components.${data.id}.label`}
                onChange={(value) => inputHandlers["containerLabel"]({ raw: value, moduleId, update: updateSubmitTittle })}
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
                        <th className="p-2 text-left">Button Text</th>
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

                            {/* Button Text */}
                            <ValidatedInput
                                value={data.text ?? ""}
                                path={`modules.${moduleId}.components.${data.id}.text`}
                                onChange={(value) => inputHandlers["containerLabel"]({
                                            raw: value,
                                            moduleId,
                                            update: updateSubmitText,
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

export default SubmitBuilderBlock;