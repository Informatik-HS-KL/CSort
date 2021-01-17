import React, {Component} from 'react';
import LegendTag from './LegendTag';
import GridLayout from 'react-grid-layout';
import Modal from 'react-modal' ;
import 'reactjs-popup/dist/index.css';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

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
        this.loadLegend();
    } 

saveLegend(){
    console.log("Legende geändert");
        var data = new FormData();
        var blob = new Blob([JSON.stringify(this.state.legendList)],{type:"text/plain"});
        console.log("savedLegend" + JSON.stringify(this.state.legendList));
        data.append('username', 'test');
        data.append('filetype', 'legend');
        data.append('file', blob);
        axios.post("http://localhost:8000/upload_cards", data, { // receive two parameter endpoint url ,form data 
      }).then(function(response){
        console.log(response);
      }).catch(function(error){
        console.log(error);
      });
      console.log('Interval triggered');
      blob = null;
}

    loadLegend = async()=>{
        const data = new FormData();
        const reader = new FileReader();
        data.append('username', 'test');
        data.append('filetype', 'legend');
    
        const res = await axios.get("http://localhost:8000/download_legend", data,{headers:{'Accept':'text/plain'},'responseType':'text'
        });
    
        console.log(res.data[0].text);
        console.log("hallöle");
        this.setState({legendList:res.data})
    }

    /* Funktion für OK Button*/
    commitLegendChanges() {
        for (var i=0; i <= 6; i++){
            this.state.legendList[i].text = this.state.helperList[i].tag;
        }
        this.saveLegend();
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

        /* Auslesen des StateArrays der Legendenattribute*/
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

        /* Style und Inhalt des Infofelds im Legendenmodal */
        const tooltipContent = "Ordnen Sie hier den Farben eine Bedeutung zu"
        const LightTooltip = withStyles((theme) => ({
            tooltip: {   
                backgroundColor: theme.palette.common.white,           
                color: 'rgba(0, 0, 0, 0.87)',
                boxShadow: theme.shadows[1],
                fontSize: "1.5em",
                width: 200,
            },
            arrow: {
                color: theme.palette.common.white,
            }
        }))(Tooltip);
        
        return ( 
            <div className ={"legend legend-" + this.props.theme} style={{ padding: 10}}>
                {/* Inhalt der Legende */}
                Legende:

                {/* Ausgabe der Legendenelemente */}
                {legendTags}

                {/* Button zum Öffnen des Modals */}
                <button className={"LegendButton button-" + this.props.theme} onClick={()=> this.setState({modalOpen: true})}></button>

                {/* Modal */}
                <Modal className ={"theme-" + this.props.theme}
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
                            overflow: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            borderRadius: '4px',
                            outline: 'none',
                            padding: 0,                            
                            
                          }             
                    }}
                >

                    {/* Modal-Inhalt */}
                    <div className={"legend-" + this.props.theme} style={{height: "3.5em", paddingTop:"0.5em"}}>
                        <h2 style={{display: "inline-block"}}>Farbcodierung hinzufügen </h2>
                        <LightTooltip className = {"theme-" + this.props.theme} title={tooltipContent} placement="right" arrow>
                            <span className= {"LegendInfo theme-" +this.props.theme} style={{position:"absolute", right: "1em", top:"0.5em"}}></span>
                        </LightTooltip>
                    </div>                      

                    {/* Legendenfelder */}              
                    <GridLayout className="layout" layout={layout} cols={2} width={window.innerWidth * 0.5} margin={[50,50]}>
                        <div key="a">
                            {/*grün*/} 
                            <LegendTag 
                                color = {"green"} theme={this.props.theme}
                                handleLegendTagChange = {this.handleLegendTagChange} 
                                valueAtIndex = {this.state.helperList[0].tag} 
                                arrayIndex = {0} 
                            /><br/>   

                            {/*gelb*/}
                            <LegendTag 
                                color = {"yellow"} theme={this.props.theme}
                                handleLegendTagChange = {this.handleLegendTagChange} 
                                valueAtIndex = {this.state.helperList[1].tag} 
                                arrayIndex = {1} 
                            /><br/>

                            {/*rot*/}
                            <LegendTag 
                                color = {"red"} theme={this.props.theme}
                                handleLegendTagChange = {this.handleLegendTagChange} 
                                valueAtIndex = {this.state.helperList[2].tag} 
                                arrayIndex = {2} 
                            />                            
                        </div>

                        <div key="b"> 
                            {/*lila*/}  
                                <LegendTag 
                                color = {"purple"} theme={this.props.theme}
                                handleLegendTagChange = {this.handleLegendTagChange} 
                                valueAtIndex = {this.state.helperList[3].tag} 
                                arrayIndex = {3} 
                            /> <br/>

                            {/*blau*/}  
                            <LegendTag 
                                color = {"blue"} theme={this.props.theme}
                                handleLegendTagChange = {this.handleLegendTagChange} 
                                valueAtIndex = {this.state.helperList[4].tag} 
                                arrayIndex = {4} 
                            /> <br/>

                            {/*hellblau*/}  
                            <LegendTag 
                                color = {"lightblue"} theme={this.props.theme}
                                handleLegendTagChange = {this.handleLegendTagChange} 
                                valueAtIndex = {this.state.helperList[5].tag} 
                                arrayIndex = {5} 
                            />                                   
                        </div>

                        <div key="c">                            
                            {/*weiß*/}
                            <LegendTag 
                                color = {"white"} theme={this.props.theme}
                                handleLegendTagChange = {this.handleLegendTagChange} 
                                valueAtIndex = {this.state.helperList[6].tag} 
                                arrayIndex = {6} 
                            />                            
                        </div>
                    </GridLayout>

                    {/* Buttons */}
                    <button className={"button-" + this.props.theme} style={{ margin: '15px' }} onClick = {()=> {
                        this.setState({modalOpen: false});
                        this.abortLegendChanges()}}> Abbrechen 
                    </button>
                    <button className={"button-" + this.props.theme} style={{ margin: '15px' }} onClick = {()=> {
                        this.setState({modalOpen: false});
                        this.commitLegendChanges()}}> Übernehmen
                    </button>
                </Modal>                
            </div>
        )
    }    
}

export default Legend;