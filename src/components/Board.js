import React, { useState } from 'react';
import { ItemTypes } from '../components/item'
import { useDrop } from 'react-dnd'
import axios from 'axios';
import { useDrag } from 'react-dnd';
import { Box } from './Box.js'


function Board(props) {

  //State als Hook
  const [, setImage] = useState(null)

  //Funktion zum verschieben der Karte(ruft Funktion in App auf um State zu ändern)
  const moveCard = (id, left, top, onBoard) => {
    onBoard ? props.setLocation(id, left, top) : props.setLocation(id, 0, 0)
    }

  //Drag and Drop Hook -> Drop
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      //rechnet left und top aus für location der Karte/Uberschrift
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      moveCard(item.id, left, top, item.onBoard);
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
  const listCards = props.cardList.map(item => (item.onBoard === true ?
    <Box key={item.id} id={item.id} left={item.left} top={item.top} color={item.color} heading={item.heading} onBoard={item.onBoard}>
      {item.text}
    </Box>
    : <div></div>
  ))

  return <div ref={drop}
    style={{ background: `url('${process.env.PUBLIC_URL}/test/background.png')`, width: '100%', height: '100%', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}>
    <label for="ImageUpload" className="ImageInput"></label>
    <input id="ImageUpload" type="file" name="myImage" onChange={onImageChange} />
    {listCards}{/* Karten/Uberschriften */}
  </div>
}

export default Board;
