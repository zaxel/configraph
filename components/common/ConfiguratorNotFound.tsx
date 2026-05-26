import React from 'react';

const ConfiguratorNotFound = ({spacingTopVh}:{spacingTopVh?: number}) => {
    const heightValue = spacingTopVh ? 100 - spacingTopVh : 100;

    return (
        <div 
            className="w-full flex items-center justify-center"
            style={{ height: `${heightValue}vh` }} 
        >
            <div className="text-gray-400 text-xl">
                Configurator not found
            </div>
        </div>
    );
};

export default ConfiguratorNotFound;