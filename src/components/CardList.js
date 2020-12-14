import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import '../css/App.css';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../components/item'
import {Box} from './Box.js'

function CardList(props) {

    const [, drag] = useDrag({
        item: { type: ItemTypes.CARD, },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    })

    const listCards = props.cardList.map(item => (item.heading === false && item.onBoard ===false?
       <Box key = {item.id} id ={item.id}  left='10' top='10' color={item.color} >
           {item.text}
       </Box>
        : <div></div>
    ))

    const listHeadings = props.cardList.map(item => (item.heading === true ?

        <div style={{ display: "inline-block", position: "relative", width: "40%", margin: "1% 5% 1% 5%" }}
            ref={drag}
        >
            <div style={{ marginTop: "25%" }}></div>
            <Card
                style={{
                    position: "absolute",
                    top: "0",
                    bottom: "0",
                    left: "0",
                    right: "0",
                }}>
                <CardContent
                    className={item.color}
                    style={{ height: "100%", weight: "100%" }}>
                    <div style={{
                        height: "100%",
                        weight: "100%",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        {item.text}
                    </div>
                </CardContent>
            </Card>
        </div>
        : <div></div>
    ))


    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                clear: "left",
                width: "90%",
                margin: "5%"
            }}
        />
    )

    return (<div>
        {listHeadings}

        {ColoredLine("")}
        <div  >
            {listCards}
        </div>

    </div >)


}

export default CardList;