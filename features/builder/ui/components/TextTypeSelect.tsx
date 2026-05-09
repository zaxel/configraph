import { Field, FieldGroup } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBuilderStore } from '../../store/builder.store';
import { TextType } from '@/features/configurator/model';

const TextTypeSelect = ({ moduleId, contentId, contentType }: { moduleId: string, contentId: string, contentType: TextType }) => {
    const textTypes: TextType[] = ["heading1", "heading2", "text-sm", "text-md", "text-md-gray", "button"];

    const setTextType = useBuilderStore(s => s.setTextType);

    return (
        <FieldGroup className="w-full max-w-xs">
            <Field>
                <Select
                    value={contentType}
                    onValueChange={(value) => {
                        setTextType(moduleId, contentId, value as TextType);
                    }}
                >
                    <SelectTrigger className="cursor-pointer">
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent
                        position={"popper"}
                    >
                        <SelectGroup>
                            {textTypes.map(type => {
                                return <SelectItem
                                    key={type}
                                    value={type}
                                >{type}</SelectItem>

                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>
        </FieldGroup>
    )
};

export default TextTypeSelect;