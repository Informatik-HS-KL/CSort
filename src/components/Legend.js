import React, {Component} from 'react';
import LegendTag from './LegendTag';
import styled from 'styled-components';
import GridLayout from 'react-grid-layout';
import Modal from 'react-modal' ;
import 'reactjs-popup/dist/index.css';
import { AiFillEdit } from "react-icons/ai";

Modal.setAppElement('#root')
class Legend extends Component {
    constructor(){
        super()
        this.state = {
             modalOpen: false,
             text: "",
        }
    }      
          
    render() {        
        /*Style für den Button der den Modal öffnet*/
        const Button = styled.button`
            background: white;
            border-radius: 4px;
            border: none;
            color: black;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
            position: absolute`
        ;  
        
        const layout = [
            { i: 'a', x: 0, y: 0, w: 1, h: 3, static: true },
            { i: 'b', x: 1, y: 0, w: 1, h: 3, static: true },
            { i: 'c', x: 0.5, y: 3, w: 1, h: 1, static: true }
           ];
        
        return ( 
            <div>
                {/* Inhalt der Legende */}
                Legende:

                {/* Legendenelemente */}
              

                {/* Button */}
                <Button style={{right: 5, top: 2}} onClick={()=> this.setState({modalOpen: true})}><AiFillEdit /></Button>

                {/* Modal */}
                <Modal 
                    isOpen = {this.state.modalOpen} 
                    onRequestClose = {()=>this.setState({modalOpen: false})}
                    style = {{
                        overlay: {backgroundColor: 'rgba(0, 0, 0, 0.5)', textAlign: 'center',},
                        content: {
                            position: 'absolute',
                            top: window.innerHeight * 0.15,
                            left: window.innerWidth * 0.25,
                            right: window.innerWidth * 0.25,
                            bottom: window.innerHeight * 0.15,
                            border: '1px solid #ccc',                            
                            overflow: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            borderRadius: '4px',
                            outline: 'none',
                            padding: 0,                            
                            backgroundColor: '#ECECEC'
                          }
             
                    }}
                >

                    {/* Modal-Inhalt */}
                    <h2 style={{backgroundColor: "#C4C4C4", height: 50}}>
                        Farbcodierung hinzufügen
                        
                    </h2>
                    <br/>  

                    {/* Legendenfelder */}              
                    <GridLayout className="layout" layout={layout} cols={2} rowHeight={window.innerHeight * 0.1} width={window.innerWidth * 0.5} margin={[50,0]}>
                        <div key="a">

                            {/*grün*/} 
                            <LegendTag color="green"/> <br/>   

                            {/*gelb*/}
                            <LegendTag color="yellow"/> <br/>

                            {/*rot*/}
                            <LegendTag color="red"/>
                        </div>

                        <div key="b"> 
                            {/*lila*/}  
                            <LegendTag color="purple"/> <br/>
                            
                            {/*blau*/}
                            <LegendTag color="blue"/><br/>

                            {/*hellblau*/}
                            <LegendTag color="lightblue"/>                                           
                        </div>

                        <div key="c">                            
                            {/*weiß*/}
                            <LegendTag />
                        </div>
                    </GridLayout>

                    {/* Buttons */}
                    <Button style= {{left: 20, bottom: 20 }} onClick = {()=> this.setState({modalOpen: false, text: ""})}>
                         Abbrechen 
                    </Button>
                    <Button style={{right: 20, bottom: 20}}onClick = {()=> (
                        this.setState({modalOpen: false}), 
                        this.props.createLegendTag(this.state.text))}> OK
                    </Button>
                </Modal>                
            </div>
        )
    }
}

export default Legend;