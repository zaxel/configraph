import { CircleX } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
type Card = {
    src: string;
    alt: string;
    onClick: () => void;
    onDeleteClick: () => void;
}

const Card = ({onClick, onDeleteClick, src, alt}: Card) => {
    return (
        <li className='cursor-pointer bg-gray-100 relative w-14 h-14 overflow-hidden'>
            <Image onClick={onClick} className='object-cover' src={src} fill sizes="56px" alt={alt} />
            <CircleX onClick={onDeleteClick} color="var(--destructive)" className='cursor-pointer absolute opacity-65 hover:opacity-100 right-0 top-0 z-10' width={20} height={20}/>
        </li>
    );
};

export default Card;