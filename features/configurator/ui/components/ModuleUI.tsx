import React from 'react';

const ModuleUI = ({children, props}) => {
    return (
        <div>
            module level component
            {children}
        </div>
    );
};

export default ModuleUI;