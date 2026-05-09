import { BuilderPartsComponent } from '../../registry';
import { Button } from '@/components/ui/button';
import { useBuilderStore } from '../../../store/builder.store';
import { Plus, Save, Trash2 } from 'lucide-react';
import { DefaultParts, meshGroup } from '@/features/configurator/model';
import { inputHandlers } from '@/features/configurator/inputs';
import PartContainer from './PartContainer';
import GroupContainer from './GroupContainer';
import ColorTypeSelect from './ColorTypeSelect';
import { ValidatedInput } from '../ValidatedInput';
import MeshesTable from './MeshesTable';
import ColorVariantsTable from './ColorVariantsTable';
import PartSettings from './PartSettings';

type PartsBuilderBlock = { data: BuilderPartsComponent, moduleId: string, defaultOpt: DefaultParts };

const PartsBuilderBlock = ({ data, moduleId, defaultOpt }: PartsBuilderBlock) => {

    const saveDraft = useBuilderStore(s => s.saveDraft);
    const saving = useBuilderStore(s => s.saving);
    const deleteModule = useBuilderStore(s => s.deleteModule);
    const setFieldDirty = useBuilderStore(s => s.setFieldDirty);
    const setFieldTouched = useBuilderStore(s => s.setFieldTouched);
    const validateField = useBuilderStore(s => s.validateField);

    const errors = useBuilderStore(s => s.errors);
    const touched = useBuilderStore(s => s.touched);

    const updatePartsTittle = useBuilderStore(s => s.updatePartsTittle);
    const addColorOption = useBuilderStore(s => s.addColorOption);
    const deleteVariant = useBuilderStore(s => s.deleteVariant);
    const deletePart = useBuilderStore(s => s.deletePart);
    const addPartGroup = useBuilderStore(s => s.addPartGroup);
    const addPart = useBuilderStore(s => s.addPart);

    const updatePartLabel = useBuilderStore(s => s.updatePartLabel);
    const updateVariantLabel = useBuilderStore(s => s.updateVariantLabel);

    const onAddColorClickHandler = (optionId: string, group: meshGroup) => {
        if (group.meshes.length === 0) {
            alert("Attach meshes before adding colors");
            return;
        }
        const newColorOption = {
            id: `clr_${crypto.randomUUID()}`,
            value: "#ffffff",
            label: "white",
            price: 0
        }
        addColorOption(moduleId, optionId, group.id, newColorOption);
    }
    const onAddVariantClickHandler = (optionId: string) => {
        addPartGroup(moduleId, optionId);
    }

    return (
        <div className="overflow-x-auto">
            {/* CONTAINER TITLE */}
            <ValidatedInput
                label="Component Title:"
                value={data.label ?? ""}
                path={`modules.${moduleId}.components.${data.id}.label`}
                onChange={(value) => inputHandlers["containerLabel"]({ raw: value, moduleId, update: updatePartsTittle })}
                errors={errors}
                touched={touched}
                setFieldDirty={setFieldDirty}
                setFieldTouched={setFieldTouched}
                validateField={validateField}
            />

            {/* PART CONTAINER */}
            <div className="flex flex-col gap-2">
                {data.options.map((opt) => {
                    return <PartContainer key={opt.id} id={opt.label ?? ""}>

                        {/* PART TITLE */}
                        <ValidatedInput
                            label="Part Title:"
                            value={opt.label ?? ""}
                            path={`modules.${moduleId}.components.${data.id}.options.${opt.id}.label`}
                            onChange={(value) => inputHandlers["partLabel"]({ raw: value, moduleId, optionId: opt.id, update: updatePartLabel })}
                            errors={errors}
                            touched={touched}
                            setFieldDirty={setFieldDirty}
                            setFieldTouched={setFieldTouched}
                            validateField={validateField}
                        />


                        {/*DEFAULT SETTINGS*/}
                        {opt.groups.length > 0 && <PartSettings
                            moduleId={moduleId}
                            opt={opt}
                            defaultOpt={defaultOpt}
                        />}
                        {opt.groups.map(group => {
                            return <GroupContainer key={group.id} label={group.label}>


                                {/* VARIANT TITLE */}
                                <ValidatedInput
                                    label="Variant Title:"
                                    value={group.label ?? ""}
                                    path={`modules.${moduleId}.components.${data.id}.options.${opt.id}.groups.${group.id}.label`}
                                    onChange={(value) => inputHandlers["variantLabel"]({ raw: value, moduleId, optionId: opt.id, groupId: group.id, update: updateVariantLabel })}
                                    errors={errors}
                                    touched={touched}
                                    setFieldDirty={setFieldDirty}
                                    setFieldTouched={setFieldTouched}
                                    validateField={validateField}
                                />

                                {/*MESHES TABLE*/}
                                <MeshesTable
                                    moduleId={moduleId}
                                    optionId={opt.id}
                                    group={group}
                                />

                                <ColorTypeSelect moduleId={moduleId} optionId={opt.id} groupId={group.id} />

                                {/*COLORS TABLE*/}
                                {!group.colors.allowCustom && <ColorVariantsTable
                                    moduleId={moduleId}
                                    componentId={data.id}
                                    optionId={opt.id}
                                    group={group}
                                    defaultOpt={defaultOpt}
                                />}
                                <div className="flex items-center justify-between gap-2 p-3 bg-muted/40">
                                    {/*VARIANTS BUTTONS*/}
                                    {!group.colors.allowCustom && <div>
                                        <Button
                                            onClick={() => onAddColorClickHandler(opt.id, group)}
                                            variant="default" size="sm" className="cursor-pointer">
                                            <Plus className="w-4 h-4 mr-1" />
                                            Add Color
                                        </Button>
                                    </div>}

                                    {/* DELETE VARIANT BTN */}
                                    <div className="flex items-center gap-2">
                                        <Button
                                            className="cursor-pointer"
                                            onClick={() => deleteVariant(moduleId, opt.id, group.id)}
                                            variant="destructive"
                                            size="sm"
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" />
                                            Delete Variant
                                        </Button>
                                    </div>
                                </div>

                            </GroupContainer>
                        })}
                        <div className="w-full flex items-center justify-between gap-2">
                            {/*ADD VARIANT BTN*/}
                            <div>
                                <Button
                                    onClick={() => onAddVariantClickHandler(opt.id)}
                                    variant="default" size="sm" className="cursor-pointer">
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add Variant
                                </Button>
                            </div>

                            {/*DELETE PART BTN*/}
                            <Button
                                className="cursor-pointer"
                                onClick={() => deletePart(moduleId, opt.id)}
                                variant="destructive"
                                size="sm"
                            >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete Part
                            </Button>
                        </div>

                    </PartContainer>
                })}
            </div>

            {/*MODULE BUTTONS*/}
            <div className="flex items-center justify-between gap-2 p-3 bg-muted/40">
                {/* LEFT */}
                <div>
                    <Button
                        onClick={() => addPart(moduleId)}
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