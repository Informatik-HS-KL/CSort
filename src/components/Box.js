import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './item'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useDrop } from 'react-dnd'
import axios from 'axios';



//React Komponente als Function
export function Box(props) {
  let id = props.id
  let left = props.left
  let top = props.top
  let onBoard = props.onBoard

  let timer = 0;
  let delay = 200;
  let prevent = false;

const doClickAction = () => {
  clearTimeout(timer); {
    console.log(' click');
    props.setChange(props.id, props.text, props.color);
    props.setModal(true);
  }
}

const handleClick = () => {
  clearTimeout(timer); {
    timer = setTimeout(function () {
      if (!prevent) {
        doClickAction();
      }
      prevent = false;
    }, delay);
  }
}
const doDoubleClickAction = () => {
  clearTimeout(timer); {
    console.log('Double Click');
    props.setDeleting(true)
  }
}
const handleDoubleClick = () => {
  clearTimeout(timer);
  prevent = true;
  doDoubleClickAction();
}

  //Drag and Drop Hook -> Drag
  const [{ isDragging }, drag] = useDrag({
    //item wird an die Drops weitergereicht
    item: {
      id, left, top, onBoard
      , type: ItemTypes.CARD
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  //Weite abhängig von onBoard
  let newWidth = ""
  props.onBoard ? newWidth = "10%" : newWidth = "38%"
  if(props.heading && props.onBoard) newWidth ="17%"
  let newPosition = ""
  props.onBoard ? newPosition = "absolute" : newPosition = "relative"

  return (

    <div
      id="1" ref={drag} style={{ display: "inline-block", position: newPosition, width: newWidth, margin: "1% 5% 1% 5%", left: props.left, top: props.top }}
      onClick={(ev)=>{
        if( ev.target.id === '1'){
          handleClick() 
        }}}
      onDoubleClick={handleDoubleClick}
    >
      { props.heading === true ? <div style={{ marginTop: "25%" }}></div> : <div style={{ marginTop: "100%" }}></div>}
      <Card
        test="test"
        id="1"
        style={{
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
        }}

      >
        <CardContent
          className={props.color}
          id="1"
          test="test"
          style={{ height: "100%", weight: "100%" }}
        >
          {props.isDeleting ?
            <button className={"button-" + props.theme}
              id="2"
              onClick={() => props.deleteCard(props.id)}
              style={{position:"absolute", right:"0.5em", top:"0.5em"}}>
              &times;
          </button> : null}

          <div
            test="test"
            id="1"
            className="Box"
            style={{
              height: "100%",
              weight: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {props.children}
          </div>
        </CardContent>
      </Card>
    </div >
  )
}
