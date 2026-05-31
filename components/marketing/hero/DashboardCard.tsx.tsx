import Image from 'next/image';
import React from 'react';

const DashboardCard = () => {
    return (
        <div className="absolute inset-0 overflow-hidden rounded-3xl border bg-white shadow-2xl">
            <Image
                fill
                src="/imgs/dashboard-preview.webp"
                alt="dashboard-preview"
                className="w-full"
            />
        </div>
    );
};

export default DashboardCard;