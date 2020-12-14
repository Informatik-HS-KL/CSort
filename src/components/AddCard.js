import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal'


Modal.setAppElement('#root')
class AddCard extends Component {
    constructor() {
        super()
        this.state = {
            modalOpen: false,
            text: "",
            radioValue: "white",
            heading: false,
        }
        this.handleRadio = this.handleRadio.bind(this)
    }

    handleRadio = (event) => {
        this.setState({ radioValue: event.target.className.split(' ')[1] });
    }

    render() {
        return <div style={{textAlign:"center"}}>
            <h4>Überschriften</h4>
            <Button
                variant="contained"
                onClick={() => this.setState({ modalOpen: true, heading: true })}
                style={{ width: '12em', height: '4em', textAlign: 'center', /*margin: '2% 25% 2.5% 25%'*/ marginTop:'2%', backgroundColor:'white' }}
            > 
            </Button>
            <h4>Karten</h4>
            <Button
                variant="contained"
                onClick={() => this.setState({ modalOpen: true })}
                style={{ width: '10em', height: '10em', textAlign: 'center', /*margin: '2% 25% 5% 25%'*/ marginTop:'2%', backgroundColor:'white'}}
            > 
            </Button>

            <Modal
                isOpen={this.state.modalOpen}
                onRequestClose={() => this.setState({ modalOpen: false })}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        textAlign: 'center'
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }

                }}>
                {this.state.heading ? <h2>Überschrift erstellen</h2> : <h2>Karte erstellen</h2>}
                <br />
                <textarea
                    id="textarea"
                    name="text"
                    cols="35"
                    rows="4"
                    placeholder="Hier Text schreiben"
                    type="text"
                    onChange={(t) => this.setState({ text: t.target.value })}
                >
                </textarea>
                <br />
                <div>
                    <span onClick={(e) => this.handleRadio(e)} className={'dot dot-green'}></span>
                    <span onClick={(e) => this.handleRadio(e)} className={'dot dot-yellow'}></span>
                    <span onClick={(e) => this.handleRadio(e)} className={'dot dot-red'}></span>
                    <span onClick={(e) => this.handleRadio(e)} className={'dot dot-purple'}></span>
                    <span onClick={(e) => this.handleRadio(e)} className={'dot dot-blue'}></span>
                    <span onClick={(e) => this.handleRadio(e)} className={'dot dot-lightblue'}></span>
                </div>
                <br />
                <Button
                    onClick={() => this.setState({ modalOpen: false, text: "", heading: false })}
                    variant="contained"
                    style={{ margin: '15px' }}
                > Abbrechen
                </Button>
                {/*eslint-disable */}
                <Button onClick={() => (
                    this.setState({ modalOpen: false, text: "", heading: false }),
                    this.state.text !== '' ? this.props.createCard(this.state.text, this.state.radioValue, this.state.heading) : null)
                }
                    variant="contained"
                    style={{ margin: '15px' }}
                > Fertig
                </Button>
            </Modal>
        </div>
    }
}

export default AddCard;
