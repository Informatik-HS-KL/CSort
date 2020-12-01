import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Draggable from "react-draggable";
import '../css/App.css';


class CardList extends Component {
    render() {
        const listItems = this.props.cardList.map(item =>(
            <Draggable>
            <Card style={{ width: '45%', height:'200px',float:'left', margin: '8px', padding:'10px'}}
            >
                <CardContent
                    style = {{textAlign:'center'}}>
                    <Typography>
                        {item.text}
                    </Typography>
                </CardContent>
                        
                   
            </Card>
            </Draggable>

        ))
        return <div>{listItems}</div>
    }
}

export default CardList;