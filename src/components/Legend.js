import React, {Component} from 'react';
import LegendTag from './LegendTag';
import GridLayout from 'react-grid-layout';
import Modal from 'react-modal' ;
import Button from '@material-ui/core/Button';
import 'reactjs-popup/dist/index.css';
import Tooltip from '@material-ui/core/Tooltip';

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
  
        
        const layout = [
            { i: 'a', x: 0, y: 0, w: 1, h: 1, static: true },
            { i: 'b', x: 1, y: 0, w: 1, h: 1, static: true },
            { i: 'c', x: 0.5, y: 1, w: 1, h: 0.33, static: true }
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

        const tooltipContent = "Ordnen Sie hier den Farben eine Bedeutung zu"
        
        return ( 
            <div className ="legend" style={{ padding: 10}}>
                {/* Inhalt der Legende */}
                <h4>Legende:</h4>

                {/* Ausgabe der Legendenelemente */}
                {legendTags}

                {/* Button zum Öffnen des Modals */}
                <button className="LegendButton" onClick={()=> this.setState({modalOpen: true})}></button>
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
                    <div style={{backgroundColor: "#C4C4C4", height: "4em", paddingTop:"0.5em"}}>
                        <h2 style={{display: "inline-block"}}>Farbcodierung hinzufügen </h2>
                        <Tooltip title={tooltipContent} placement="right" arrow>
                            <span className= "LegendInfo" style={{position:"absolute", right: "1em", top:"1em"}}></span>
                        </Tooltip>
                    </div>                      

                    {/* Legendenfelder */}              
                    <GridLayout className="layout" layout={layout} cols={2} width={window.innerWidth * 0.5} margin={[50,50]}>
                        <div key="a">
                            {/*grün*/} 
                            <LegendTag 
                                color = {"green"} 
                                handleLegendTagChange = {this.handleLegendTagChange} 
                                valueAtIndex = {this.state.helperList[0].tag} 
                                arrayIndex = {0} 
                            /><br/>   

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
                    <Button variant="contained" style={{ margin: '15px' }} onClick = {()=> {
                        this.setState({modalOpen: false});
                        this.abortLegendChanges()}}> Abbrechen 
                    </Button>
                    <Button variant="contained" color="primary" style={{ margin: '15px' }} onClick = {()=> {
                        this.setState({modalOpen: false});
                        this.commitLegendChanges()}}> Übernehmen
                    </Button>
                </Modal>                
            </div>
        )
    }    
}

export default Legend;