import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';
import '../css/App.css';
import AddCard from './AddCard';
import CardList from './CardList';
import Board from './Board';
import Legend from './Legend';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Icon } from "@material-ui/core";
import Switch from '@material-ui/core/Switch';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      lastIndex: 0,
      delete: false,
      modalOpen: false,
      changedCardOnBoard: -1,
      changedCardText: "",
      changedCardColor: "",
      isDark: false,
    }
    this.setLocation = this.setLocation.bind(this)
    this.createCard = this.createCard.bind(this)
    this.setCardOnBoard = this.setCardOnBoard.bind(this)
    this.deleteCard = this.deleteCard.bind(this)
    this.setDeleting = this.setDeleting.bind(this)
    this.setModal = this.setModal.bind(this)
    this.setChange = this.setChange.bind(this)
    this.changeCard = this.changeCard.bind(this)
    this.saveCards = this.saveCards.bind(this)
    this.toggleDarkMode = this.toggleDarkMode.bind(this)
    this.createCardOnBoard = this.createCardOnBoard.bind(this)
    this.getChangedCard = this.getChangedCard.bind(this)
  }

      //Karten in eine json und an den Server senden -> cards.json

      saveCards(){
        var data = new FormData();
        var blob = new Blob([JSON.stringify(this.state.cards)],{type:"text/plain"});
        console.log("savedCards" + JSON.stringify(this.state.cards));
        data.append('username', 'test');
        data.append('filetype', 'cards');
        data.append('file', blob);
        axios.post("http://localhost:3011/upload_cards", data, { // receive two parameter endpoint url ,form data 
      }).then(function(response){
        console.log(response);
      }).catch(function(error){
        console.log(error);
      });
      console.log('Interval triggered');
      blob = null;
      };

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
    }
    ),  this.saveCards)
  
  }

  changeCard(text, color) {
    let cards2 = [...this.state.cards];
    let count = this.state.changedCardOnBoard
    let card = { ...cards2[count] };
    card.text = text;
    card.color = color;
    cards2[count] = card;
    this.setState({ cards: cards2 }
      , this.saveCards
    )
  }

  setChange(value,text, color){
    console.log(value, text, color)
    this.setState({changedCardOnBoard: value, changedCardText:text, changedCardColor:color})
  }

  deleteCard(key) {
    this.setState(prevState => ({ cards: prevState.cards.filter(card => card.id !== key) }
    ) , this.saveCards
    )
  }

  setDeleting(value) {
    this.setState({ delete: value })
  }
  setModal(value) {
    this.setState({ modalOpen: value })
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
    }));

  }
    
  //Funktion zum Ändern von onBoard im State
  //onBoard ist dazu da um nachzuverfolgen ob eine Karte noch in der Liste ist oder auf dem Board
  setCardOnBoard(id, value) {
    const elementsIndex = this.state.cards.findIndex(element => element.id === id)
    let newArray = [...this.state.cards]
    newArray[elementsIndex] = { ...newArray[elementsIndex], onBoard: value }
    this.setState({
      cards: newArray
    })

  }

  getChangedCard(id){
    const elementsIndex = this.state.cards.findIndex(element => element.id === id)
    return elementsIndex

  }

  //Funktion zum Ändern der Location einer Karte im State
  setLocation(id, left, top) {
    const elementsIndex = this.state.cards.findIndex(element => element.id === id)
    let newArray = [...this.state.cards]
    newArray[elementsIndex] = { ...newArray[elementsIndex], left: left, top: top }
    this.setState({
      cards: newArray,
    },
      this.saveCards
    )
  }

  toggleDarkMode() {
    this.setState({ isDark: !this.state.isDark, });
  }

  render() {
    const layout = [
      { i: 'a', x: 0, y: 0, w: 3, h: 7, static: true },
      { i: 'b', x: 0, y: 7, w: 3, h: 20, static: true },
      { i: 'c', x: 3, y: 0, w: 9, h: 27, static: true }
    ];

    const wWidth = window.innerWidth;

    //Überprüft, ob Darkmode aktiviert ist
    const testDark = this.state.isDark;
    let theme;
    if (testDark) {
      theme = "dark";
    }
    else {
      theme = "light";
    }

    return (
      //DndProvider für Drag and Drop
      <div>
        <header className={"legend-" + theme} id="header">
          <h4 className="ueberschrift" >
            {/* Logo als .svg */}
            <Icon>
              <img src={process.env.PUBLIC_URL + '/Logo_CSort.svg'} alt="CSort Logo" className="Logo" />
            </Icon>
            CSort
            {/* DarkMode Switch */}
            <div style={{ position: "absolute", right: "2em", top: "0.5em" }}>
              <img src={process.env.PUBLIC_URL + '/sun-3-24.png'} alt="hell" />
              <Switch
                color="dwfault"
                onChange={this.toggleDarkMode}
              />
              <img src={process.env.PUBLIC_URL + '/moon-2-24.png'} alt="dunkel" />
            </div>

          </h4>
        </header>
        <DndProvider backend={HTML5Backend}>
          <GridLayout className="layout" layout={layout} cols={12} rowHeight={window.innerHeight / 18} width={wWidth * 0.99 - wWidth % 2} margin={[0, 0]}>
            <div key="a" className={"theme-" + theme} > {/* Neue Überschrift/Karte Block */}
              <AddCard theme={theme} createCard={this.createCard} setModal={this.setModal} modalOpen={this.state.modalOpen}
                changeCard={this.changeCard} changedCardOnBoard={this.state.changedCardOnBoard} setChange={this.setChange}  changedCardText={this.state.changedCardText}
                changedCardColor={this.state.changedCardColor}/>
            </div>
            <div key="b" className={"theme-" + theme} > {/* Noch nicht platzierte Karten Block */}
              <CardList theme={theme} cardList={this.state.cards} setCardOnBoard={this.setCardOnBoard} setLocation={this.setLocation}
                deleteCard={this.deleteCard} setDeleting={this.setDeleting} isDeleting={this.state.delete} setModal={this.setModal}
                changedCardOnBoard={this.state.changedCardOnBoard} changeCard={this.changeCard} setChange={this.setChange} />
            </div>
            <div key="c" className={"board-" + theme} style={{ display: "flex" }}> {/* Board */}
              <Board createCardOnBoard={this.createCardOnBoard} createCard={this.createCard} theme={theme} cardList={this.state.cards} setCardOnBoard={this.setCardOnBoard} setLocation={this.setLocation}
                setDeleting={this.setDeleting} deleteCard={this.deleteCard} isDeleting={this.state.delete} setModal={this.setModal}
                changedCardOnBoard={this.state.changedCardOnBoard} changeCard={this.changeCard} setChange={this.setChange} />
            </div>
          </GridLayout>
        </DndProvider>
        <Legend theme={theme} />
      </div>
    );
  }
}

export default App;
