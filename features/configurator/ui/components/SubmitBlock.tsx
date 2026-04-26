import Button from '@/components/common/Button';
import React from 'react';
import { SubmitComponent } from '../../model';

const SubmitBlock = ({ data }: {data: SubmitComponent}) => {
    return (
        <div>
            {data.label && <h3 className='font-medium text-xl mb-4'>{data.label}</h3>}
            <Button onClick={() => console.log("submit")} className='w-max' >
                {data.text}
            </Button>
        </div>
    );
};

export default SubmitBlock;
