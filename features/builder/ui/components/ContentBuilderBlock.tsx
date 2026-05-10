import React from 'react';
import { BuilderContentComponent } from '../registry';
import { Button } from '@/components/ui/button';
import { Plus, Save, Trash2 } from 'lucide-react';
import { useBuilderStore } from '../../store/builder.store';
import { inputHandlers } from '@/features/configurator/inputs';
import TextTypeSelect from './TextTypeSelect';
import { textStyles, tagMap } from '@/features/configurator/ui/components/Text';
import { ContentText } from '../../store/slices/content.types';
import { ValidatedInput } from './ValidatedInput';

type ContentBuilderBlock = { data: BuilderContentComponent, moduleId: string };

const ContentBuilderBlock = ({ data, moduleId }: ContentBuilderBlock) => {
    const deleteModule = useBuilderStore(s => s.deleteModule);
    const setFieldDirty = useBuilderStore(s => s.setFieldDirty);
    const setFieldTouched = useBuilderStore(s => s.setFieldTouched);
    const validateField = useBuilderStore(s => s.validateField);

    const errors = useBuilderStore(s => s.errors);
    const touched = useBuilderStore(s => s.touched);

    const updateContentTittle = useBuilderStore(s => s.updateContentTittle);

    const updateTextOption = useBuilderStore(s => s.updateTextOption);
    const deleteTextOption = useBuilderStore(s => s.deleteTextOption);
    const addTextOption = useBuilderStore(s => s.addTextOption);

    const saveDraft = useBuilderStore(s => s.saveDraft);
    const saving = useBuilderStore(s => s.saving);

    const onAddTextClickHandler = () => {
        const content: ContentText = {
            id: `cnt_${crypto.randomUUID()}`,
            value: "New Text",
            textType: "text-md"
        }
        addTextOption(moduleId, content);
    }

    return (
        <div className="overflow-x-auto">
            <ValidatedInput
                label="Component Title:"
                value={data.label ?? ""}
                path={`modules.${moduleId}.components.${data.id}.label`}
                onChange={(value) => inputHandlers["containerLabel"]({ raw: value, moduleId, update: updateContentTittle })}
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
                        <th className="p-2 text-left">Value</th>
                        <th className="p-2 text-left">Text Type</th>
                        <th className="p-2 text-left">Sample</th>
                        <th className="p-2 text-center">Del</th>
                    </tr>
                </thead>

                <tbody>
                    {data.content.map((text, index) => {
                        const Tag = tagMap[text.textType] || "p";
                        return <tr key={text.id} className="border-t">
                            {/* ID (readonly) */}
                            <td className="p-2 text-xs text-muted-foreground">
                                <div className="w-14 truncate">
                                    {text.id}
                                </div>
                            </td>

                            {/* VALUE */}
                            <ValidatedInput
                                value={text.value ?? ""}
                                path={`modules.${moduleId}.components.${data.id}.content.${index}.value`}
                                onChange={(value) => inputHandlers["contentTextValue"]({
                                            raw: value,
                                            moduleId,
                                            textId: text.id,
                                            update: updateTextOption,
                                        })}
                                errors={errors}
                                touched={touched}
                                setFieldDirty={setFieldDirty}
                                setFieldTouched={setFieldTouched}
                                validateField={validateField}
                            />

                            {/* Text Type */}
                            <td className="p-2">
                                <TextTypeSelect moduleId={moduleId} contentId={text.id} contentType={text.textType} />
                            </td>

                            {/* Sample */}
                            <td className="p-2 w-18">
                                <Tag className={textStyles[text.textType]}>
                                    Sample
                                </Tag>
                            </td>


                            {/* DELETE */}
                            <td className="p-2 text-center">
                                <Button
                                    className="cursor-pointer"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => deleteTextOption(moduleId, text.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>

            <div className="flex items-center justify-between gap-2 p-3 bg-muted/40">
                {/* LEFT */}
                <div>
                    <Button
                        onClick={onAddTextClickHandler}
                        variant="default" size="sm" className="cursor-pointer">
                        <Plus className="w-4 h-4 mr-1" />
                        Add Content
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

export default ContentBuilderBlock;