import React, { useState } from 'react';
import { ItemTypes } from '../components/item'
import { useDrop } from 'react-dnd'
import axios from 'axios';
import { useDrag } from 'react-dnd';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Box } from './Box.js'


function Board(props) {

  const [, setImage] = useState(null)

  const setBoard = (id) => {
    props.setCardOnBoard(id)
  }

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      setBoard(item.id)
      return undefined;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  })

  const [, drag] = useDrag({
    item: { type: ItemTypes.CARD, },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
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

  const listCards = props.cardList.map(item => (item.heading === false && item.onBoard === true ?
    <Box key={item.id} id={item.id} left='10' top='10' color={item.color}>
      {item.text}
    </Box>
    : <div></div>
  ))

  return <div ref={drop}
    style={{ background: `url('${process.env.PUBLIC_URL}/test/background.png')`, width: '100%', height: '100%', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', border: isOver ? "solid" : "hidden", borderColor: isOver && "yellow" }}>
    <label for="ImageUpload" className="ImageInput"></label>
    <input id="ImageUpload" type="file" name="myImage" onChange={onImageChange} />
    {listCards}
  </div>
}

export default Board;
