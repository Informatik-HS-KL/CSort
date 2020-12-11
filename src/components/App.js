import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';
import '../css/App.css';
import AddCard from './AddCard';
import CardList from './CardList';
import Board from './Board';
import Legend from './Legend';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'

class App extends Component {
  constructor() {
    super();
    this.state = {
      cards: [
      ]
    }
    this.createCard = this.createCard.bind(this)
  }
  createCard(text, color, heading) {
    this.setState(prevState => ({
      cards: [...prevState.cards,
      {
        id: 1,
        text: text,
        color: color,
        heading: heading,
      }
      ]
    }))
  }

  render() {
    const layout = [
      { i: 'a', x: 0, y: 0, w: 3, h: 6, static: true },
      { i: 'b', x: 0, y: 6, w: 3, h: 12, static: true },
      { i: 'c', x: 3, y: 0, w: 9, h: 17, static: true },
      { i: 'd', x: 3, y: 17, w: 9, h: 1, static: true }
     ];

     var headerHeight = document.getElementById("header").offsetHeight;

    return (
      <DndProvider backend={HTML5Backend}>
        <GridLayout className="layout" layout={layout} cols={12} rowHeight={window.innerHeight / 18} width={window.innerWidth} margin={[0, 0]}>
          <div key="a" style={{ backgroundColor: "#ECECEC" }}> {/* Neue Überschrift/Karte Block */}
            <AddCard createCard={this.createCard} />
          </div>
          <div key="b" style={{ backgroundColor: "#ECECEC" }}> {/* Noch nicht platzierte Karten Block */}
            <CardList cardList={this.state.cards} />
          </div>
          <div key="c" style={{ backgroundColor: "#565656",display: "flex" }}> {/* Board */}
            <Board />
          </div>
          <div key="d" style={{ backgroundColor: "#c4c4c4" }}> {/* Legende  */}
            <Legend />
          </div>
        </GridLayout>
      </DndProvider>

    );
  }
}

export default App;
