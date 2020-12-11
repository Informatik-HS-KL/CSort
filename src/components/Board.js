import React from 'react';
import { ItemTypes } from '../components/item'
import { useDrop } from 'react-dnd'

function Board(props) {
    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.CARD,
        drop: (item, monitor)=>console.log(item, monitor),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
          })
        })
    return <div ref={drop}
    style={{ display: "flex",heigt: "100%", width: "100%", border: isOver ? "solid" : "hidden", borderColor:isOver&&"yellow"}}>
            	
    </div>

}

export default Board;