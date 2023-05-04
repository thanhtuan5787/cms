import React, { useState, useEffect, useContext } from "react";
import { Input } from '../../utils/helpers';
import ColorPicker from '../../utils/ui/ColorPicker';
import SiteContext from '../../pageContext';

export default function PanelControls({ elemData, setPanelControls }) {
    const siteData = useContext(SiteContext);
    const { onUpdateDiv: onUpdated, mode, setModal } = siteData;

    function onLocalUpdate(newProps) {
        var updatedProps = {
            ...newProps,
        };
        onUpdated(elemData.id, updatedProps);
    }

    const [colorPickerActive, setColorPickerActive] = useState(false);
    useEffect(() => {
        if (!colorPickerActive) {
            setPanelControls(null);
        }
    }, [colorPickerActive]);

    return (
        <>
            <div
                onClick={() => {
                    if (!colorPickerActive) {
                        setColorPickerActive(true);
                        setPanelControls(
                            <ColorPicker
                                color={
                                    elemData.style &&elemData.style.backgroundColor ||
                                    'black'
                                }
                                onChange={(color) => {
                                    onLocalUpdate({...{style:{backgroundColor: color}}});
                                }}
                                onClose={() => {
                                }}
                            />,
                        );
                    } else {
                        setColorPickerActive(false);
                    }
                }}
                style={{
                    borderRadius: 5,
                    width: 25,
                    height: 25,
                    backgroundColor: elemData.style && elemData.style.backgroundColor,
                    border: '1px solid black',
                    marginRight: '10px',
                }}
            ></div>
            <Input
                placeholder={'Button Label'}
                defaultValue={elemData.label}
                key={elemData.id + '-input'}
                onChange={(value) => {
                    onLocalUpdate({ label: value });
                }}
            />
            <div
                className={'cbutton cbuttoninner'}
                onClick={() => {
                    setModal(
                        <MessageInputModal
                            prefill={elemData.message}
                            onComplete={(data) => {
                                onLocalUpdate({ message: data });
                                setModal(null);
                            }}
                        />,
                    );
                }}
            >
                <i className="fas fa-info-circle"></i>
            </div>
        </>
    );
}

function MessageInputModal(props) {
    const [value, setValue] = useState(props.prefill || 'change me!');
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <input
                className={'minimal-input'}
                style={{ display: 'flex', flexGrow: 1 }}
                autoFocus={true}
                defaultValue={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            ></input>
            <button
                className={'button'}
                onClick={() => {
                    props.onComplete(value);
                }}
            >
                Set
            </button>
            <div className="is-divider" data-content="OR"></div>
        </div>
    );
}