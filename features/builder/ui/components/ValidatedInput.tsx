import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ValidatedInputProps = {
    value: string;
    path: string;
    onChange: (value: string) => void;
    errors: Record<string, { message: string }[]>;
    touched: Record<string, boolean>;
    setFieldDirty: (path: string) => void;
    setFieldTouched: (path: string) => void;
    validateField: (path: string) => void;
    label?: string;       
    className?: string;    
    type?: "text" | "number" | "email";
};

export const ValidatedInput = ({
    label,
    value,
    path,
    onChange,
    errors,
    touched,
    setFieldDirty,
    setFieldTouched,
    validateField,
    className,
    type,
}: ValidatedInputProps) => {
    const fieldErrors = errors[path];
    const isTouched = touched[path];

    const input = (
        <>
            <Input
                type={type ?? "text"}
                value={value}
                onChange={(e) => {
                    setFieldDirty(path);
                    onChange(e.target.value);
                }}
                onBlur={() => {
                    setFieldTouched(path);
                    validateField(path);
                }}
                onKeyDown={(e) => e.stopPropagation()}
            />
            {isTouched && fieldErrors?.length > 0 && (
                <span className="text-red-500 text-xs">
                    {fieldErrors[0].message}
                </span>
            )}
        </>
    );

    if (!label) return <td className={cn("p-2", className)}>{input}</td>;

    return (
        <div className={cn("flex gap-6 items-center", className)}>
            <p className="p-2 text-left">{label}</p>
            <div className="p-2">{input}</div>
        </div>
    );
};