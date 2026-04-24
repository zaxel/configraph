import Button from '@/components/common/Button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { AlignCenter, AlignLeft, AlignRight, Bold, BrushCleaning, Italic, Minus, Plus, Underline } from 'lucide-react';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import { useConfiguratorStore } from '../../store/configurator.store';
import { TextAlign } from '../../store/slices/canvas.types';
import { debounce } from '@/lib/debounce';

const TextPanel = () => {
    const requestCommit = useConfiguratorStore(s => s.requestCommit);

    const fontFamily = useConfiguratorStore(s => s.textEditor.fontFamily);
    const fontSize = useConfiguratorStore(s => s.textEditor.fontSize);
    const color = useConfiguratorStore(s => s.textEditor.color);
    const fontWeight = useConfiguratorStore(s => s.textEditor.fontWeight);
    const fontStyle = useConfiguratorStore(s => s.textEditor.fontStyle);
    const underline = useConfiguratorStore(s => s.textEditor.underline);
    const textAlign = useConfiguratorStore(s => s.textEditor.textAlign);
    const reset = useConfiguratorStore(s => s.resetTextEditor);

    const setTextEditor = useConfiguratorStore(s => s.setTextEditor);

    const FONTS = ['Arial', 'Georgia', 'Helvetica', 'Courier-New', 'Verdana', 'Impact'];

    const adjust = (amount: number) => {
        setTextEditor({ fontSize: Math.min(Math.max(fontSize + amount, 8), 120) })
    };

    const activeStyles = [
        ...(fontWeight === "bold" ? ["bold"] : []),
        ...(fontStyle === "italic" ? ["italic"] : []),
        ...(underline ? ["underline"] : []),
    ];

    const handleStyleChange = (values: string[]) => {
        setTextEditor({
            fontWeight: values.includes("bold") ? "bold" : "normal",
            fontStyle: values.includes("italic") ? "italic" : "normal",
            underline: values.includes("underline"),
        });
    };

    const debouncedUpdate = useMemo(
        () => debounce((val: string) => setTextEditor({ color: val }), 200),
        [setTextEditor]
    );

    return (
        <div className="w-full h-auto flex flex-col gap-4">
            <div className="flex gap-4">
                <Select
                    value={fontFamily}
                    onValueChange={(value) => setTextEditor({ fontFamily: value })
                    }>
                    <SelectTrigger className="box-content border-foreground text-foreground w-34 h-8! py-0 bg-background rounded-lg">
                        <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {FONTS.map((font) => (
                                <SelectItem key={font} value={font}>
                                    <span style={{ fontFamily: font }}>{font.replace(/-/g, ' ')}</span>
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <div className="flex items-center">
                    {/* Decrement Button */}
                    <Button
                        variant="outline"
                        className="border-foreground rounded-r-none border-r-0 h-8 py-0 z-10"
                        onClick={() => adjust(-1)}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>

                    {/* Number Input */}
                    <Input
                        readOnly
                        type="number"
                        value={fontSize}
                        className="box-content h-8 py-0 w-8 border-foreground text-foreground bg-background rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />

                    {/* Increment Button */}
                    <Button
                        variant="outline"
                        className="rounded-l-none border-l-0 h-8 py-0"
                        onClick={() => adjust(1)}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="flex gap-4">
                <ToggleGroup
                    type="multiple"
                    variant="outline"
                    value={activeStyles}
                    onValueChange={handleStyleChange}
                >
                    <ToggleGroupItem className="border-foreground rounded-l-lg! cursor-pointer" value="bold" aria-label="Toggle bold">
                        <Bold className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem className="border-foreground cursor-pointer" value="italic" aria-label="Toggle italic">
                        <Italic className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem className="border-foreground rounded-r-lg! cursor-pointer" value="underline" aria-label="Toggle underline">
                        <Underline className="h-4 w-4" />
                    </ToggleGroupItem>
                </ToggleGroup>

                <input className="h-10 cursor-pointer" id="text-color" type="color" value={color} onChange={(e) => debouncedUpdate(e.target.value)} />

                <ToggleGroup
                    type="single"
                    variant="outline"
                    defaultValue="left"
                    value={textAlign}
                    onValueChange={(value) => {
                        if (value) setTextEditor({ textAlign: value as TextAlign });
                    }}
                >
                    <ToggleGroupItem className="border-foreground rounded-l-lg! cursor-pointer" value="left" aria-label="Align left">
                        <AlignLeft className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem className="border-foreground cursor-pointer" value="center" aria-label="Align center">
                        <AlignCenter className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem className="border-foreground rounded-r-lg! cursor-pointer" value="right" aria-label="Align right">
                        <AlignRight className="h-4 w-4" />
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
            <div className="flex gap-4 ml-auto">
                <Button onClick={() => requestCommit()} variant={"outline"} className='w-max' icon={<Image className='inline mr-2' width={14} height={14} src={'/icons/save.svg'} alt="save sticker" />}>
                    Apply
                </Button>
                <Button onClick={() => reset()} variant={"outline"} className='w-max' icon={<BrushCleaning width={14} height={14} />}>
                    Reset
                </Button>
            </div>

        </div>
    );
};

export default TextPanel;