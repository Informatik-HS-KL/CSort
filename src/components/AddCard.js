import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal'

Modal.setAppElement('#root')
class AddCard extends Component {
    constructor(){
        super()
        this.state = {
             modalOpen: false,
             text: "",
        }
    }
    render() {
        return <div>
            <Button variant="contained" color="primary" onClick={()=> this.setState({modalOpen: true})}> Karte erstellen
            </Button>
            <Modal 
                isOpen = {this.state.modalOpen} 
                onRequestClose = {()=>this.setState({modalOpen: false})}
                style = {
                    {overlay: {backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    textAlign: 'center',
                },
                content: { 
                    top: '300px',
                    left: '750px',
                    right: '750px',
                    bottom: '300px'}
                }
                }>
                <h2>Karte erstellen
                </h2>
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
                <br/>
                <button onClick = {()=> this.setState({modalOpen: false, text: ""})}> Abbrechen 
                </button>
                <button onClick = {()=> {this.setState({modalOpen: false}), this.props.createCard(this.state.text)}}> Fertig 
                </button>
            </Modal>
        </div>
            }
}

export default AddCard;
