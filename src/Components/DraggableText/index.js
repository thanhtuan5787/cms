import React, { useState, useRef, useContext, useEffect } from 'react';
import EditItem from '../DDEditor/EditItem';
import SiteContext from '../../pageContext';
import PanelControls from './PanelControls'

const fontList = ['Times New Roman', 'Arial', 'Courier New'];

function DraggableText(props) {
    const { elemData, mode, selected } = props;
    const siteData = useContext(SiteContext);

    const fontSource = !fontList.includes(elemData.style &&elemData.style.fontFamily)
        ? 'google'
        : '';

    function onLocalUpdate(newProps) {
        var updatedProps = {
            ...newProps,
        };

        siteData.onUpdateDiv(elemData.id, updatedProps);
    }

    return (
        <>
            <EditItem
                elemData={elemData}
                selected={selected}
                renderPanel={selected && PanelControls}
                onLocalUpdate={onLocalUpdate}
                mode={mode}
            >
                <EditableDiv
                    elemData={elemData}
                    value={elemData.text}
                    contentEditable={selected}
                    key={elemData.id}
                    onChange={(text) => {
                        onLocalUpdate({ text: text });
                    }}
                    style={{
                        ...elemData.style,
                    }}
                />
            </EditItem>
        </>
    );
}

export default DraggableText;

function EditableDiv(props) {
    const { elemData,value, contentEditable, onChange, style } = props;
    const [mobileEditing, setMobileEditing] = useState(false);
    const [cursor, setCursor] = useState(null);
    const [dragMove, setDragMove] = useState(false);
    const inputRef = useRef();
    const inputFakeRef = useRef(null);

    useEffect(()=>{
        if(mobileEditing) {
            inputFakeRef.current.focus();
        }
    }, [mobileEditing])

    // function emitChange() {
    //     console.log("emitChange");
    //     var value = inputRef.current.innerHTML;
    //     onChange && onChange(value);
    // }

    // function onPaste(e) {
    //     e.preventDefault();
    //     var text = e.clipboardData.getData('text/plain');
    //     document.execCommand('insertHtml', false, text);
    // }

    return (<>
        {!mobileEditing && <div
            // ref={inputRef}
            // onPaste={onPaste}
            // onInput={emitChange}
            // onBlur={emitChange}
            // contentEditable={contentEditable}
            onTouchStart={() => {
                !contentEditable && setDragMove(true);
            }}
            onTouchMove={()=> {
                setDragMove(true);
            }}
            onTouchEndCapture={()=>{
                contentEditable && !dragMove && setMobileEditing(true);
                setDragMove(false);
            }}
            onFocus={() => {
                setCursor('pointer');
            }}
            // suppressContentEditableWarning={true}
            style={{ cursor: cursor, ...style } 
        }
        >
             {elemData.text}
        </div>}
        {mobileEditing && <div>
            <textarea             
                style={{ cursor: cursor, border: 'none', background: "rgba(0,0,0,0)", width: '100%', height: '200%', ...style }}
                defaultValue={text} 
                ref={inputFakeRef}
                onInput={(e)=> {onChange(value)}}
                onBlur={()=>{setMobileEditing(false)}}></textarea>
        </div>}
        </>
    );
}
