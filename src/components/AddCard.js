import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal'
import Radio from '@material-ui/core/Radio';


Modal.setAppElement('#root')
class AddCard extends Component {
    constructor(){
        super()
        this.state = {
             modalOpen: false,
             text: "",
             radioValue:"red",

        }
        this.handleRadio = this.handleRadio.bind(this)

    }
    handleRadio = (event) => {
        this.setState({radioValue: event.target.value});
      }
        


    render() {
        return <div>
            <Button 
                variant="contained" 
                onClick={()=> this.setState({modalOpen: true})}
                style = {{   width: '46%', height:'200px', textAlign:'center', margin:'20%'}}
                > Karte erstellen
            </Button>
            <Modal 
                isOpen = {this.state.modalOpen} 
                onRequestClose = {()=>this.setState({modalOpen: false})}
                style = {{
                    overlay: {backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    textAlign: 'center'
                    },
                    content : {
                        top                   : '50%',
                        left                  : '50%',
                        right                 : 'auto',
                        bottom                : 'auto',
                        marginRight           : '-50%',
                        transform             : 'translate(-50%, -50%)'
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
                <Radio
                    value='red'
                    checked = {this.state.radioValue==="red"}
                    onChange = {this.handleRadio}
                    
                />
                <Radio
                    value='blue'
                    checked = {this.state.radioValue==="blue"}
                    color = 'primary'
                    onChange = {this.handleRadio}
                />
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
                    this.state.text!=''?this.props.createCard(this.state.text):null)
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
