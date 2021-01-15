import React, { useState, useEffect } from 'react';
import { ItemTypes } from '../components/item'
import { useDrop } from 'react-dnd'
import axios from 'axios';
import { useDrag } from 'react-dnd';
import { Box } from './Box.js'
import { formatMs } from '@material-ui/core';
import SelectInput from '@material-ui/core/Select/SelectInput';

var loaded = false;
var image = null;
var imageURL = null;

function Board(props) {

  if(!loaded){
    loadBackground();
    loadCards();
    loaded = true;
  }

  /*useEffect(() => {
    const interval = setInterval(() => {
      saveCards();
    }, 10000);
    return () => clearInterval(interval);
  }, []);*/

  //State als Hook
  const [, setImage] = useState(null)

  //Funktion zum verschieben der Karte(ruft Funktion in App auf um State zu ändern)
  const moveCard = (id, left, top, onBoard) => {
    onBoard ? props.setLocation(id, left, top) : props.setLocation(id, 0, 0);
    }

  //Drag and Drop Hook -> Drop
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      //rechnet left und top aus für location der Karte/Uberschrift
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      //setzt onBoard true -> Karte verschwindet aus CardList
      props.setCardOnBoard(item.id, true);
      moveCard(item.id, left, top, item.onBoard);
      return undefined;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  })

  async function loadBackground(){
    const data = new FormData();
    const reader = new FileReader();
    data.append('username', 'test');
    data.append('filetype', 'background');

    //await axios.get("http://localhost:8000/download_background", data,{headers:{responseType:'blob'}
  await axios({url:'http://localhost:8000/download_background',method:'GET',responseType:'blob'})
  .then(response=>{image=new Blob([response],{type:'image/png'});
    console.log(image);
      imageURL = URL.createObjectURL(image);
      document.getElementById("board").style.background=imageURL;
    });
    console.log(image.className);
  }

 
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
  const listCards = props.cardList.map(item => (item.onBoard === true ?
    <Box key={item.id} id={item.id} left={item.left} top={item.top} color={item.color} heading={item.heading} onBoard={item.onBoard}>
      {item.text}
    </Box>
    : <div></div>
  ))

  //Karten in eine json und an den Server senden -> cards.json

  function saveCards(){
    var data = new FormData();
    var blob = new Blob([JSON.stringify(props.cardList)],{type:"text/plain"});
    console.log("savedCards" + JSON.stringify(props.cardList));
    data.append('username', 'test');
    data.append('filetype', 'cards');
    data.append('file', blob);
    axios.post("http://localhost:8000/upload_cards", data, { // receive two parameter endpoint url ,form data 
  }).then(function(response){
    console.log(response);
  }).catch(function(error){
    console.log(error);
  });
  console.log('Interval triggered');
  blob = null;
  };
  
  //Lädt die Karten vom Server runter 
 async function loadCards(){
    const data = new FormData();
    const reader = new FileReader();
    data.append('username', 'test');
    data.append('filetype', 'cards');

    const res = await axios.get("http://localhost:8000/download_cards", data,{headers:{'Accept':'text/plain'},'responseType':'text'
    });
    //Karten liegen als res.data in einem json vor
    console.log(res.data);
    for(var i=0;i<res.data.length;i++ ){
      //aus den Daten wieder Karten erzeugen
      props.createCard(res.data[i].text, res.data[i].color, res.data[i].heading, res.data[i].onBoard, res.data[i].left, res.data[i].top);
    }
  }

  return <div id="board" ref={drop}
    style={{ background: `url(http://localhost:8000/download_background)`, width: '100%', height: '100%', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}>
    <label for="ImageUpload" className="ImageInput"></label>
    <input id="ImageUpload" type="file" name="myImage" onChange={onImageChange} />
    {listCards}{/* Karten/Uberschriften */}
  </div>
}

export default Board;
