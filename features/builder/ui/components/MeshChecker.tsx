import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';

const MeshChecker = () => {
    return (
        <div className="w-full">
            <div className="mb-6 flex justify-between items-center gap-4 text-xl">
                <div >Detected Meshes</div>
                <div className="mr-6">Toggle</div>

            </div>
            <ul className="flex flex-col gap-4">
                <li className="flex justify-between items-center gap-4">
                    <span>Object-kslkd-98</span>
                    <Checkbox checked className='mr-10 cursor-pointer'/>
                </li>
                <li className="flex justify-between items-center gap-4">
                    <span>Object-kslkd-98</span>
                    <Checkbox className='mr-10 cursor-pointer'/>
                </li>
                <li className="flex justify-between items-center gap-4">
                    <span>Object-k-9</span>
                    <Checkbox className='mr-10 cursor-pointer'/>
                </li>
                <li className="flex justify-between items-center gap-4">
                    <span>Object-ks-8</span>
                    <Checkbox className='mr-10 cursor-pointer'/>
                </li>
                <li className="flex justify-between items-center gap-4">
                    <span>Object-k-7</span>
                    <Checkbox className='mr-10 cursor-pointer'/>
                </li>
                <li className="flex justify-between items-center gap-4">
                    <span>sole</span>
                    <Checkbox className='mr-10 cursor-pointer'/>
                </li>
            </ul>
        </div>
    );
};

export default MeshChecker;