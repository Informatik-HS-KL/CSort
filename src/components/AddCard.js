import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal'
import  '../css/AddCard.css';


Modal.setAppElement('#root')
class AddCard extends Component {
    constructor(){
        super()
        this.state = {
             modalOpen: false,
             text: "",
             radioValue: "white",
        }
        this.handleRadio = this.handleRadio.bind(this)
    }

    handleRadio = (event) => {
        this.setState({radioValue: event.target.className.split(' ')[1]});
      }
        
    render() {
        return <div>
          <Button 
                variant="contained" 
                onClick={()=> this.setState({modalOpen: true})}
                style = {{width: '40%', height:'180px', textAlign:'center', margin:'10% 25% 10% 25%'}}
            > Karte erstellen
            </Button>
           
            <Modal 
                isOpen = {this.state.modalOpen} 
                onRequestClose = {()=>this.setState({modalOpen: false})}
                style = {{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        textAlign: 'center'
                    },
                    content : {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                      }

                }}>
                <h2>Karte erstellen</h2>
                <br/>
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
                <div>
                    <span onClick={(e)=>this.handleRadio(e)} className ={'dot dot-green'}></span>
                    <span onClick={(e)=>this.handleRadio(e)} className ={'dot dot-yellow'}></span>
                    <span onClick={(e)=>this.handleRadio(e)} className ={'dot dot-red'}></span>
                    <span onClick={(e)=>this.handleRadio(e)} className ={'dot dot-purple'}></span>
                    <span onClick={(e)=>this.handleRadio(e)} className ={'dot dot-blue'}></span>
                    <span onClick={(e)=>this.handleRadio(e)} className ={'dot dot-lightblue'}></span>
                </div>
                <br/>
                <Button 
                    onClick = {()=> this.setState({modalOpen: false, text: ""})}
                    variant="contained" 
                    style = {{margin:'15px'}}
                > Abbrechen 
                </Button>
                {/*eslint-disable */}
                <Button onClick = {()=> (
                    this.setState({modalOpen: false, text: ""}),
                    this.state.text!=''?this.props.createCard(this.state.text, this.state.radioValue):null)
                    }
                    variant="contained" 
                    style = {{margin:'15px'}}
                > Fertig
                </Button>
            </Modal>
        </div>
            }
}

export default AddCard;
