import React, { useContext, useEffect, useState } from 'react';
import { Column, Row } from '../utils/helpers';
import defaultButtons from './defaultButtons';
import { v4 as uuidv4 } from 'uuid';
import SiteContext from '../pageContext';

export function AddButton({ item, showMenu, setSelector }) {
    const siteData = useContext(SiteContext);

    return (
        <div
            className={'cbutton tooltip'}
            onClick={(e) => {
                switch (item[1].action) {
                    case 'add':
                        siteData.addItemToList(item[1].object);
                        showMenu(null);
                        break;
                    case 'menu':
                        showMenu(item[1].objects);
                        break;
                }
                e.stopPropagation();
            }}
        >
            {item[1].label && (
                <span className="tooltiptext">{item[1].label}</span>
            )}

            <i className={`${item[1].icon}`}></i>
        </div>
    );
}

function Menu({ addItemToList, selected }) {
    const siteData = useContext(SiteContext);

    return (
        <div
            className={'cpanel'}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <Row>
                <NestedMenu
                    data={defaultButtons}
                    addItemToList={siteData.addItemToList}
                    parentSelected={selected}
                />
            </Row>
        </div>
    );
}

function NestedMenu({ data, addItemToList, parentSelected }) {
    const [selected, setSelected] = useState(null);
    const [selector, setSelector] = useState(null);

    useEffect(() => {
        setSelected(null);
        setSelector(null);
    }, [parentSelected]);

    useEffect(() => {
        setSelector(null);
    }, [selected]);

    return (
        <>
            {selector && <Column className={'cpanel-col'}>{selector}</Column>}
            {/* todo make this truly recursive by adding editmenu again */}
            {selected != null && (
                <NestedMenu
                    data={selected}
                    addItemToList={addItemToList}
                    parentSelected={selected}
                />
            )}
            <Column className={'cpanel-col cpanel-col-buttons'}>
                {Object.entries(data).map((item) => {
                    return (
                        <AddButton
                            key={uuidv4()}
                            item={item}
                            showMenu={setSelected}
                            setSelector={setSelector}
                        />
                    );
                })}
            </Column>
        </>
    );
}

export default Menu;
