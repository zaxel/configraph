import React from 'react';
import { ContentComponent } from '../../model';
import { Text } from './Text';

const ContentBlock = ({data} : { data: ContentComponent }) => {
    return (
        <Text variant={data.content.textType}>
            {data.content.value}
        </Text>
    );
};

export default ContentBlock;