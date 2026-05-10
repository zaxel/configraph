import React from 'react';
import { BuilderCanvasComponent } from '../registry';
import { Button } from '@/components/ui/button';
import { Save, Trash2 } from 'lucide-react';
import { useBuilderStore } from '../../store/builder.store';
import { inputHandlers } from '@/features/configurator/inputs';
import { ValidatedInput } from './ValidatedInput';

type CanvasBuilderBlock = { data: BuilderCanvasComponent, moduleId: string };

const CanvasBuilderBlock = ({ data, moduleId }: CanvasBuilderBlock) => { 
    const deleteModule = useBuilderStore(s => s.deleteModule);
    const setFieldDirty = useBuilderStore(s => s.setFieldDirty);
    const setFieldTouched = useBuilderStore(s => s.setFieldTouched);
    const validateField = useBuilderStore(s => s.validateField);

    const errors = useBuilderStore(s => s.errors);
    const touched = useBuilderStore(s => s.touched);

    const updateCanvasTittle = useBuilderStore(s => s.updateCanvasTittle);

    const saveDraft = useBuilderStore(s => s.saveDraft);
    const saving = useBuilderStore(s => s.saving);

    return (
        <div className="overflow-x-auto">
            <ValidatedInput
                label="Component Title:"
                value={data.label ?? ""}
                path={`modules.${moduleId}.components.${data.id}.label`}
                onChange={(value) => inputHandlers["containerLabel"]({ raw: value, moduleId, update: updateCanvasTittle })}
                errors={errors}
                touched={touched}
                setFieldDirty={setFieldDirty}
                setFieldTouched={setFieldTouched}
                validateField={validateField}
            />

            <div>Canvas Enabled</div>

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

export default CanvasBuilderBlock;