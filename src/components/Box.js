import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './item'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useDrop } from 'react-dnd'
import axios from 'axios';


//React Komponente als ArrowFunction
export const Box = ({ id, left, top, children, color, heading, onBoard }) => {

  //Drag and Drop Hook -> Drag
  const [{ isDragging }, drag] = useDrag({
    //item wird an die Drops weitergereicht
    item: { id, left, top, onBoard, type: ItemTypes.CARD },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  //Weite abhängig von onBoard
  let newWidth = ""
  onBoard ? newWidth = "10%" : newWidth = "39%"

  let newPosition=""
  onBoard ? newPosition="absolute" : newPosition = "relative"


  return (
    <div id = "1" ref={drag} style={{ display: "inline-block", position: newPosition, width: newWidth, margin: "1% 5% 1% 5%", left: left, top: top }}>
       
      { heading === true ? <div style={{ marginTop: "25%" }}></div> : <div style={{ marginTop: "100%" }}></div>}
      <Card 
        style={{
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
        }}>
        <CardContent
          className={color}
          style={{ height: "100%", weight: "100%" }}>
          <div style={{
            height: "100%",
            weight: "100%",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          >
            {children}
          </div>
        </CardContent>
      </Card>
    </div >
  )
}
