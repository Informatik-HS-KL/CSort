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
      ],
      lastIndex: 0,
    }

    this.setLocation = this.setLocation.bind(this)
    this.createCard = this.createCard.bind(this)
    this.createCardOnBoard = this.createCardOnBoard.bind(this)
    this.setCardOnBoard = this.setCardOnBoard.bind(this)
  }

  saveVariables(){
    
  }

  //Funktion zum Erstellen von Karten/Uberschriften im State
  createCard(text, color, heading) {
    this.setState(prevState => ({
      //alter State wird kopiert
      cards: [...prevState.cards,
      {
        id: this.state.lastIndex,
        text: text,
        color: color,
        heading: heading,
        onBoard: false,
        left: 0,
        top: 0,
      }],
      lastIndex: this.state.lastIndex + 1,
    }))
  }

  //onBoard, left und top um die Karten wieder vom Server zu laden
  createCardOnBoard(text, color, heading, onBoard, left, top) {
    this.setState(prevState => ({
      //alter State wird kopiert
      cards: [...prevState.cards,
      {
        id: this.state.lastIndex,
        text: text,
        color: color,
        heading: heading,
        onBoard: onBoard,
        left: left,
        top: top,
      }],
      lastIndex: this.state.lastIndex + 1,
    }))
  }

  //Funktion zum Ändern von onBoard im State
  //onBoard ist dazu da um nachzuverfolgen ob eine Karte noch in der Liste ist oder auf dem Board
  setCardOnBoard(id, value) {
    const elementsIndex = this.state.cards.findIndex(element => element.id === id)
    let newArray = [...this.state.cards]
    newArray[elementsIndex] = { ...newArray[elementsIndex], onBoard: value }
    this.setState({
      cards: newArray,
    });
  }

  //Funktion zum Ändern der Location einer Karte im State
  setLocation(id, left, top) {
    const elementsIndex = this.state.cards.findIndex(element => element.id === id)
    let newArray = [...this.state.cards]
    newArray[elementsIndex] = { ...newArray[elementsIndex], left: left, top: top }
    this.setState({
      cards: newArray,
    });
  }

  render() {
    const layout = [
    
      { i: 'a', x: 0, y: 0, w: 3, h: 6, static: true },
      { i: 'b', x: 0, y: 6, w: 3, h: 12, static: true },
      { i: 'c', x: 3, y: 0, w: 9, h: 18, static: true }
    ];

    var headerHeight = document.getElementById("header").offsetHeight;

    return (
      //DndProvider für Drag and Drop
      <div>
        <DndProvider backend={HTML5Backend}>
          <GridLayout className="layout" layout={layout} cols={12} rowHeight={window.innerHeight / 18} width={window.innerWidth} margin={[0, 0]}>
            <div key="a" style={{ backgroundColor: "#ECECEC" }}> {/* Neue Überschrift/Karte Block */}
              <AddCard createCard={this.createCard} />
            </div>
            <div key="b" style={{ backgroundColor: "#ECECEC" }}> {/* Noch nicht platzierte Karten Block */}
              <CardList cardList={this.state.cards} setCardOnBoard={this.setCardOnBoard} setLocation={this.setLocation} />
            </div>
            <div key="c" style={{ backgroundColor: "#565656", display: "flex" }}> {/* Board */}
              <Board createCard={this.createCardOnBoard} cardList={this.state.cards} setCardOnBoard={this.setCardOnBoard} setLocation={this.setLocation} />
            </div>
          </GridLayout>
        </DndProvider>
        <Legend />
      </div>
    );
  }
}

export default App;
