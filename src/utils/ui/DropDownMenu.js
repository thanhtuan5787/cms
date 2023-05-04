import React, { useRef, useState } from 'react';

export default function DropDownMenu({ options, selectedOption, onSelect, type }) {
    const [selected, setSelected] = useState(false);
    const [scrollLimit, setScrollLimit] = useState(20);
    const listInnerRef = useRef();

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="dropdown" >
                    <button
                        className="button"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu"
                        onClick={() => {
                            setSelected(!selected);
                        }}
                    >
                        {type && type == "font" && selectedOption &&<>
                            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
                            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
                            <link href={`https://fonts.googleapis.com/css2?family=${selectedOption && selectedOption.split(" ").join("+")}&display=swap`} rel="stylesheet"></link>
                        </>}
                        <span style={type && type == "font" ? {fontFamily: selectedOption} : {}}>{selectedOption}</span>
                        <span className="icon is-small">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                {selected && (
                    <div class="dropdown-content" id="dropdown-menu" role="menu" onBlur={()=>{ setSelected(false)}}>
                        <div ref={listInnerRef} class="dropdown-content" style={{maxHeight: '400px', overflowY: 'scroll'}}
                            onScroll={() => {
                                if (listInnerRef.current) {
                                  const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
                                  if (scrollTop + clientHeight === scrollHeight) {
                                    setScrollLimit(scrollLimit + 10);
                                  }
                                }
                              }}>
                            {options.slice(0,scrollLimit).map((elem) => {
                                return (
                                    <><a
                                        href="#"
                                        onClick={(e) => {
                                            onSelect(elem);
                                            setSelected(false);
                                        }}
                                        style={{fontFamily: elem }}
                                        class={`dropdown-item ${
                                            elem == selectedOption &&
                                            'is-active'
                                        }`}
                                    >
                                        {type && type == "font" && elem && <>
                                            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
                                            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
                                            <link href={`https://fonts.googleapis.com/css2?family=${elem && elem.split(" ").join("+")}&display=swap`} rel="stylesheet"></link>
                                        </>}
                                        
                                        {elem}
                                    </a><br/></>
                                );
                            })}
                            {/* <hr class="dropdown-divider" /> */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
