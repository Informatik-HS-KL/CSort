import React, { useState, useEffect } from 'react';
import { ItemTypes } from '../components/item'
import { useDrop } from 'react-dnd'
import axios from 'axios';
import { Box } from './Box.js'
import { serialize, deserialize } from 'react-serialize'
import App from './App'
import { formatMs } from '@material-ui/core';
import SelectInput from '@material-ui/core/Select/SelectInput';

var loaded = false;
var image = null;
var imageURL = null;

function Board(props) {

  let topOffset = 0;
  let leftOffset = 0;
  let delta = 0;

  if(!loaded){
    loadCards();
    loaded = true;
  }

  //State als Hook
  const [, setImage] = useState(null)

  //Funktion zum verschieben der Karte(ruft eine Funktion in App.js auf um State zu ändern)
  const moveCard = (id, left, top, onBoard) => {
    onBoard ? props.setLocation(id, left, top) : props.setLocation(id, 0, 0)
  }

  //Drag and Drop Hook -> Drop
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      //rechnet left und top aus für location der Karte/Uberschrift
      delta = monitor.getSourceClientOffset();
      if (item.onBoard) {
        delta = monitor.getDifferenceFromInitialOffset();
        leftOffset = 0
        topOffset = 0
      }
      const left = item.left + delta.x - leftOffset;
      const top = item.top + delta.y - topOffset;
      moveCard(item.id, left, top, true);
      //setzt onBoard true -> Karte verschwindet aus CardList
      props.setCardOnBoard(item.id, true);
      return undefined;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  })

  const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      console.log("Hier " + event.target.files[0]);
      setImage(
        URL.createObjectURL(img)
      );
      const data = new FormData();
      data.append('username', 'test');
      data.append('filetype', 'background');
      data.append('file', event.target.files[0]);
      axios.post("http://localhost:8000/upload_background", data, { // receive two parameter endpoint url ,form data 
      })
        .then(res => { // then print response status
          console.log(res.statusText)
        });
    }
  }

  //liste von Karten die onBoard==true
  let listCards = props.cardList.map(item => (item.onBoard === true ?
    <Box style={{ position: "sticky" }} key={item.id} id={item.id} left={item.left} top={item.top} color={item.color} heading={item.heading} onBoard={item.onBoard}
      deleteCard={props.deleteCard} isDeleting={props.isDeleting} setDeleting={props.setDeleting} setModal={props.setModal}
      changedCardOnBoard={props.changedCardOnBoard} changeCard={props.changeCard} setChange={props.setChange}
    >
      {item.text}
    </Box>
    : <div></div>
  ))

  //Lädt die Karten vom Server runter 
  async function loadCards() {
    const data = new FormData();
    const reader = new FileReader();
    data.append('username', 'test');
    data.append('filetype', 'cards');

    const res = await axios.get("http://localhost:8000/download_cards", data, {
      headers: { 'Accept': 'text/plain' }, 'responseType': 'text'
    });
    //Karten liegen als res.data in einem json vor
    console.log("typeof res.data: "+typeof res.data)
    for (var i = 0; i < res.data.length; i++) {
      //aus den Daten wieder Karten erzeugen
      props.createCard(res.data[i].text, res.data[i].color, res.data[i].heading, res.data[i].onBoard, res.data[i].left, res.data[i].top);
    }
  }

  return <div
    onClick={(ev) => {
      if (ev.target.id !== '1' && ev.target.id !== '2') {
        props.setDeleting(false)
      }
    }
    }
    ref={drop}
    style={{ width: '100%', height: '100%' }}>
    <div
      ref={el => {
        if (!el) return;
        topOffset = el.getBoundingClientRect().top;
        leftOffset = el.getBoundingClientRect().left;
      }}
      style={{ background: `url(http://localhost:8000/download_background)`, width: '100%', height: '100%', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
      <label for="ImageUpload" className={"ImageInput button-" + props.theme}></label>
      <input id="ImageUpload" type="file" name="myImage" onChange={onImageChange} />
      {listCards}{/* Karten/Uberschriften */}
    </div>
  </div>

}

export default Board;
