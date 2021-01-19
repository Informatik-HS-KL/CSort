import React from 'react';
import '../css/App.css';
import { Box } from './Box.js'
import { ItemTypes } from '../components/item'
import { useDrop } from 'react-dnd'

function CardList(props) {

    //Drag and Drop Hook -> Drop
    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.CARD,
        drop: (item, monitor) => {
            //Karte wird auf CardList gesetzt
            props.setCardOnBoard(item.id, false)
            //Location resetet
            props.setLocation(item.id, 0, 0)
            return undefined;
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    })
    //alle Karten die nicht auf dem Board sind
    const listCards = props.cardList.map(item => (item.heading === false && item.onBoard === false ?
        <Box key={item.id} id={item.id} left={item.left} top={item.top} onBoard={item.onBoard} 
        deleteCard={props.deleteCard} setDeleting={props.setDeleting} isDeleting={props.isDeleting} setModal={props.setModal}
        changedCardOnBoard={props.changedCardOnBoard} changeCard={props.changeCard} setChange={props.setChange}
        >
            {item.text}
        </Box>
        : <div></div>
    ))

    //alle Uberschriften die nicht auf dem Board sind
    const listHeadings = props.cardList.map(item => (item.heading === true && item.onBoard === false ?
        <Box key={item.id} id={item.id} left={item.left} top={item.top} heading={item.heading} onBoard={item.onBoard} 
        deleteCard={props.deleteCard} setDeleting={props.setDeleting} isDeleting={props.isDeleting} setModal={props.setModal}
        changedCardOnBoard={props.changedCardOnBoard} changeCard={props.changeCard} setChange={props.setChange}
        >
            {item.text}
        </Box>
        : <div></div>
    ))


    return (
        <div ref={drop} style={{ width: "100%", height: "100%" }}>
             <h4 style={{textAlign:"center"}}>Ungeordnet</h4>
            {listHeadings}{/* Uberschriften */}
            <hr className={"hr-" + props.theme} style={{borderWidth: 1, clear: "left", width: "90%", marginBottom: "1%", marginTop: "1%"}} />{/* Trennlinie */}
            <div  >
                {listCards}{/* Karten */}
            </div>
        </div >)
 
}

export default CardList;