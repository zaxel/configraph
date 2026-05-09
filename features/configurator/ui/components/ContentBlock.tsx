import React from 'react';
import { ContentComponent } from '../../model';
import { Text } from './Text';

const ContentBlock = ({ data }: { data: ContentComponent }) => {
    if (!data) return;
    return (
        <>
            {data.content.map(cont => {
                return <Text key={cont.id} variant={cont.textType}>
                    {cont.value}
                </Text>
            })}
        </>
    );
};

export default ContentBlock;