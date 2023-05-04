import React from 'react';
import DraggableText from './DraggableText';
import DraggableImage from './DraggableImage';
import DraggableButton from './DraggableButton';

function ComponentSelector({ elem, selected }) {
    const isSelected = selected && selected.includes(elem.id);
    switch (elem.kind) {
        case 'text':
            return (
                <DraggableText
                    elemData={elem}
                    selected={isSelected}
                />
            );
        case 'button':
            return (
                <DraggableButton
                    elemData={elem}
                    selected={isSelected}
                />
            );
        case 'image':
            return (
                <DraggableImage
                    elemData={elem}
                    selected={isSelected}
                />
            );
        default:
            return <></>;
    }
}

export default ComponentSelector;
