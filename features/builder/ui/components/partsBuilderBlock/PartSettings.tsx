import { Checkbox } from "@/components/ui/checkbox";
import { useBuilderStore } from "@/features/builder/store/builder.store";
import { DefaultParts, OptionsComponent } from "@/features/configurator/model";

type PartSettings = {
    moduleId: string,
    opt: OptionsComponent,
    defaultOpt: DefaultParts
}

export const PartSettings = ({ moduleId, opt, defaultOpt }: PartSettings) => {
    const setDefaultPart = useBuilderStore(s => s.setDefaultPart);
    const setOptionalPart = useBuilderStore(s => s.setOptionalPart);
    const setPartEnabled = useBuilderStore(s => s.setPartEnabled);

    return (
        <div className="flex justify-end gap-4">
            <p className="mr-auto">variants:</p>
            <label className="flex gap-2 items-center">
                <Checkbox
                    checked={defaultOpt?.selectedPart === opt.id || false}
                    onCheckedChange={() => {
                        const isSelected = defaultOpt?.selectedPart === opt.id || false;
                        setDefaultPart(moduleId, opt.id, isSelected);
                    }}
                />
                <span>default part</span>
            </label>
            <label className="flex gap-2 items-center">
                <Checkbox
                    checked={opt.optional}
                    onCheckedChange={() => {
                        setOptionalPart(moduleId, opt.id, opt.optional);
                    }}
                />
                <span>optional</span>
            </label>
            {opt.optional && <label className="flex gap-2 items-center">
                <Checkbox
                    checked={opt.enabled}
                    onCheckedChange={() => {
                        setPartEnabled(moduleId, opt.id, opt.enabled);
                    }}
                />
                <span>enabled</span>
            </label>}
        </div>
    );
};

export default PartSettings;