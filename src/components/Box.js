import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './item'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import '../css/App.css';

const style = {
  position: 'absolute',
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
}

export const Box = ({ id, left, top, children, color }) => {

  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top, type: ItemTypes.CARD },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <div
      ref={drag}
      style={{ display: "inline-block", position: "relative", width: "40%", margin: "1% 5% 1% 5%", }}>
      <div style={{ marginTop: "100%" }}
      >
      </div>
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
    </div>

  )
}

/*
 <div ref={drag} style={{ ...style, left, top }}>
      {children}
    </div>
        */