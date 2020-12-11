import React, {Component} from 'react';
import GridLayout from 'react-grid-layout';
import '../css/App.css';
import AddCard from './AddCard';
import CardList from './CardList';
import Board from './Board';
import Legend from './Legend';

class App extends Component {
  constructor () {
    super();    
    this.state = {
      cards: []
    }
    this.createCard = this.createCard.bind(this)
  }
  createCard(text){
    this.setState(prevState => ({cards: [...prevState.cards, text]}))
  }
  render(){ 
    const layout = [
      { i: 'a', x: 0, y: 0, w: 3, h: 6, static: true },
      { i: 'b', x: 0, y: 6, w: 3, h: 12, static: true },
      { i: 'c', x: 3, y: 0, w: 9, h: 17, static: true },
      { i: 'd', x: 3, y: 17, w: 9, h: 1, static: true }
     ];

     var headerHeight = document.getElementById("header").offsetHeight;

    return (
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={(window.innerHeight - headerHeight) / 18} width={window.innerWidth} margin={[0,0]}>
          <div key="a" style={{backgroundColor: "#ECECEC"}}> {/* Neue Überschrift/Karte Block */}
            <AddCard createCard= {this.createCard}/>
          </div>  
          <div key="b" style={{backgroundColor: "#ECECEC"}}> {/* Noch nicht platzierte Karten Block */}
            <CardList cardList = {this.state.cards}/>
          </div> 
          <div key="c" style={{backgroundColor: "#565656"}}> {/* Board */}
            <Board />
          </div>
          <div key="d" style={{backgroundColor: "#c4c4c4"}}> {/* Legende  */}
            <Legend />
          </div>
      </GridLayout>
    );
  }
}

export default App;
