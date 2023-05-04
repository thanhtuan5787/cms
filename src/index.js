import React, {useState} from 'react'

import DragDrop from './DragDrop'

import "./index.css";

const DragDropComponent = props => {
  return <>
      <DragDrop mode={"edit"} {...props}/>
    </>
}
export default DragDropComponent
