import React, {Component} from 'react';
import LegendTag from './LegendTag';
import styled from 'styled-components';
import GridLayout from 'react-grid-layout';
import Modal from 'react-modal' ;
import 'reactjs-popup/dist/index.css';
import { AiFillEdit, AiFillInfoCircle} from "react-icons/ai";

Modal.setAppElement('#root')
class Legend extends Component {
    constructor(props){
        super(props)
        this.state = {
             modalOpen: false,
             legendList: [
                {color: "green", text: ""},
                {color: "yellow", text: ""},
                {color: "red", text: ""},
                {color: "purple", text: ""},
                {color: "blue", text: ""},
                {color: "lightblue", text: ""},
                {color: "white", text: ""},
            ],
            helperList: [
                {tag: ""},
                {tag: ""},
                {tag: ""},
                {tag: ""},
                {tag: ""},
                {tag: ""},
                {tag: ""},
            ]            
        }
    }   

    /* Funktion für OK Button*/
    commitLegendChanges() {
        for (var i=0; i <= 6; i++){
            this.state.legendList[i].text = this.state.helperList[i].tag;
        }
    }

    /* Funktion für Abbrechen Button*/
    abortLegendChanges() {
        for (var i=0; i <= 6; i++){
            this.state.helperList[i].tag = this.state.legendList[i].text;
        }
    }

    /* Updaten des Hilfsarrays */
    handleLegendTagChange = idx => evt => {
        const newLegendTags = this.state.helperList.map((legendTag, sidx) => {
          if (idx !== sidx) return legendTag;
          return { ...legendTag, tag: evt.target.value };
        });
    
        this.setState({ helperList: newLegendTags });
      };
          
    render() {        
        /* Style für die Buttons */
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

        const legendTags = this.state.legendList.map(function(item) {
            for (var i = 0; i <= 6; i++){
                if(item.text !== ""){
                    return(
                        <div style={{display: "inline", marginLeft: 15}}>
                            <span className= {'small-dot dot-' + item.color }/>
                            <div style= {{display: "inline", verticalAlign: "top"}}>{item.text}</div>
                        </div>
                    )
                }
            }
        })
        
        return ( 
            <div style={{marginLeft: 10}}>
                {/* Inhalt der Legende */}
                Legende:

                {/* Ausgabe der Legendenelemente */}
                {legendTags}

                {/* Button zum Öffnen des Modals */}
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
                        <span style={{position: "absolute", right: 5}}><AiFillInfoCircle /></span>                 
                    </h2><br/>                      

                    {/* Legendenfelder */}              
                    <GridLayout className="layout" layout={layout} cols={2} rowHeight={window.innerHeight * 0.1} width={window.innerWidth * 0.5} margin={[50,0]}>
                        <div key="a">
                            {/*grün*/} 
                            <LegendTag 
                                color = {"green"} 
                                handleLegendTagChange = {this.handleLegendTagChange} 
                                valueAtIndex = {this.state.helperList[0].tag} 
                                arrayIndex = {0} 
                            /> <br/>   

                            {/*gelb*/}
                            <LegendTag 
                                color = {"yellow"} 
                                handleLegendTagChange = {this.handleLegendTagChange} 
                                valueAtIndex = {this.state.helperList[1].tag} 
                                arrayIndex = {1} 
                            /><br/>

                            {/*rot*/}
                            <LegendTag 
                                color = {"red"} 
                                handleLegendTagChange = {this.handleLegendTagChange} 
                                valueAtIndex = {this.state.helperList[2].tag} 
                                arrayIndex = {2} 
                            />                            
                        </div>

                        <div key="b"> 
                            {/*lila*/}  
                                <LegendTag 
                                color = {"purple"} 
                                handleLegendTagChange = {this.handleLegendTagChange} 
                                valueAtIndex = {this.state.helperList[3].tag} 
                                arrayIndex = {3} 
                            /> <br/>

                            {/*blau*/}  
                            <LegendTag 
                                color = {"blue"} 
                                handleLegendTagChange = {this.handleLegendTagChange} 
                                valueAtIndex = {this.state.helperList[4].tag} 
                                arrayIndex = {4} 
                            /> <br/>

                            {/*hellblau*/}  
                            <LegendTag 
                                color = {"lightblue"} 
                                handleLegendTagChange = {this.handleLegendTagChange} 
                                valueAtIndex = {this.state.helperList[5].tag} 
                                arrayIndex = {5} 
                            />                                   
                        </div>

                        <div key="c">                            
                            {/*weiß*/}
                            <LegendTag 
                                color = {"white"} 
                                handleLegendTagChange = {this.handleLegendTagChange} 
                                valueAtIndex = {this.state.helperList[6].tag} 
                                arrayIndex = {6} 
                            />                            
                        </div>
                    </GridLayout>

                    {/* Buttons */}
                    <Button style= {{left: 20, bottom: 20 }} onClick = {()=> {
                        this.setState({modalOpen: false});
                        this.abortLegendChanges()}}> Abbrechen 
                    </Button>
                    <Button style={{right: 20, bottom: 20}}onClick = {()=> {
                        this.setState({modalOpen: false});
                        this.commitLegendChanges()}}> OK
                    </Button>
                </Modal>                
            </div>
        )
    }    
}

export default Legend;