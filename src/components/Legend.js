import React, {Component} from 'react';
import styled from 'styled-components';
import GridLayout from 'react-grid-layout';
import Modal from 'react-modal'
import 'reactjs-popup/dist/index.css';
import { AiFillEdit } from "react-icons/ai";

class Legend extends Component {
    constructor(){
        super()
        this.state = {
             modalOpen: false,
             text: "",
        }
    }

    render() {        
        const Button = styled.button`
            background: white;
            border-radius: 4px;
            border: none;
            color: black;
            position: absolute;
            right: 5px;
            top: 3px`
        ;  
        
        const layout = [
            { i: 'a', x: 0, y: 0, w: 1, h: 6, static: true },
            { i: 'b', x: 1, y: 0, w: 1, h: 6, static: true }
           ];
        
        return ( 
            <div>
                {/* Inhalt der Legende */}
                Legende:
              

                {/* Button */}
                <Button onClick={()=> this.setState({modalOpen: true})}><AiFillEdit /></Button>

                {/* Modal */}
                <Modal 
                    isOpen = {this.state.modalOpen} 
                    onRequestClose = {()=>this.setState({modalOpen: false})}
                    style = {{
                        overlay: {backgroundColor: 'rgba(0, 0, 0, 0.5)', textAlign: 'center',},
                        content: {
                            position: 'absolute',
                            top: window.innerHeight * 0.05,
                            left: window.innerWidth * 0.05,
                            right: window.innerWidth * 0.05,
                            bottom: window.innerHeight * 0.05,
                            border: '1px solid #ccc',
                            background: '#fff',
                            overflow: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            borderRadius: '4px',
                            outline: 'none',
                            padding: '20px'
                          }
             
                    }}
                >

                    {/* Modal-Inhalt */}
                    <h2>Legende</h2>
                    <br/>                
                    <GridLayout className="layout" layout={layout} cols={2} rowHeight={window.innerHeight * 0.1} width={window.innerWidth * 0.9 - 40} margin={[0,0]}>
                        <div key="a">
                            Elemente
                        </div>
                        <div key="b">
                            Neues Element zur Legende hinzufügen
                            <textarea
                                id="textarea" 
                                name="text" 
                                cols="35" 
                                rows="4"
                                placeholder = "Hier Text schreiben"
                                type = "text" 
                                onChange= {(t)=>this.setState({text: t.target.value})}
                                >
                            </textarea>
                            <br/>
                            <button>Hinzufügen</button>
                           <button>Abbrechen</button>
                        </div>
                    </GridLayout>

                    <button onClick = {()=> this.setState({modalOpen: false, text: ""})}>
                         Abbrechen 
                    </button>
                    <button onClick = {()=> (
                        this.setState({modalOpen: false}), 
                        this.props.createCard(this.state.text))}> Fertig 
                    </button>
                </Modal>                
            </div>
        )
    }
}

export default Legend;