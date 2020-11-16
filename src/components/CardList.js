import React, {Component} from 'react';

class CardList extends Component {
    render() {
        const listItems = this.props.cardList.map(item =>(
            <div>{item}</div>
        ))
        return <div>{listItems}</div>
    }
}

export default CardList;