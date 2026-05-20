import React from 'react';
import { useBuilderStore } from '../../store/builder.store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

export const MAX_NAME = 50;

const TitleUpdate = () => {
    const { name } = useBuilderStore(s => s.configurator);
    const setConfiguratorName = useBuilderStore(s => s.setConfiguratorName);
    const saving = useBuilderStore(s => s.saving);
    const updateConfiguratorMeta = useBuilderStore(s => s.updateConfiguratorMeta);

    const error =
        name.trim().length > MAX_NAME
            ? `Max ${MAX_NAME} characters`
            : undefined;

    const updateNameHandler = async () => {
        let finalName = name.trim();
        if (finalName.length > MAX_NAME) {
            finalName = finalName.slice(0, MAX_NAME);
            setConfiguratorName(finalName);
        }
        await updateConfiguratorMeta();
    }

    return (
        <div className="flex gap-4">
            <div>

                <Input
                    value={name}
                    onChange={(e) => setConfiguratorName(e.target.value)}
                />

                {error && (
                    <p className="text-red-500 text-sm">
                        {error}
                    </p>
                )}
            </div>
            <Button
                className="cursor-pointer"
                disabled={saving}
                onClick={() => updateNameHandler()}
                variant="default"
                size="sm"
            >
                <Save className="w-4 h-4 mr-1" />
                {saving ? "Updating..." : "Update Name"}
            </Button>
        </div>
    );
};

export default TitleUpdate;