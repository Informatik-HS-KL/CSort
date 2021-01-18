import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal'

Modal.setAppElement('#root')

class AddCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            radioValue: ".dot-white",
            heading: false,
        }
        this.handleRadio = this.handleRadio.bind(this)
        this.handleButtonAccept = this.handleButtonAccept.bind(this)

    }

    //aktualisieren des radioValue/Farbe
    handleRadio = (event) => {
        //splitet className um zweiten dot value zu bekommen
        this.setState({ radioValue: event.target.className.split(' ')[1] });
    }

    //aktualisieren des radioValue/Farbe
    handleButtonAccept = (event) => {
        if (this.props.changedCardOnBoard === -1) {
            this.state.text !== '' && this.props.createCard(this.state.text, this.state.radioValue, this.state.heading)
        } else {
            this.state.text !== '' && this.props.changeCard(this.state.text, this.state.radioValue, this.state.heading);
        }
        this.props.setChange(-1)
        this.setState({ text: "", heading: false });
        this.props.setModal(false);
    }

    render() {
        return (<div style={{ textAlign: "center" }}>
            <h4>Überschriften</h4>
            <Button
                variant="contained"
                onClick={() => (this.setState({ heading: true }), this.props.setModal(true))}
                style={{ width: '12em', height: '4em', textAlign: 'center', /*margin: '2% 25% 2.5% 25%'*/ marginTop: '2%', backgroundColor: 'white' }}
            >
            </Button>
            <h4>Karten</h4>
            <Button
                variant="contained"
                onClick={() => this.props.setModal(true)}
                style={{ width: '10em', height: '10em', textAlign: 'center', /*margin: '2% 25% 5% 25%'*/ marginTop: '2%', backgroundColor: 'white' }}
            >
            </Button>
            {/* Modal (Fenster was sich im Vordergrund öffnet)*/}
            <Modal
                isOpen={this.props.modalOpen}
                onRequestClose={() => (this.props.setModal(false), this.props.setChange(-1))}
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
                {/* h2 je nach dem ob Karte oder Uberschrift */}
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
               { this.state.text}
                </textarea>
                <br />
                {/* Farbauswahl */}
                <div>
                    <span onClick={(e) => this.handleRadio(e)} className={'dot dot-white'}></span>
                    <span onClick={(e) => this.handleRadio(e)} className={'dot dot-green'}></span>
                    <span onClick={(e) => this.handleRadio(e)} className={'dot dot-yellow'}></span>
                    <span onClick={(e) => this.handleRadio(e)} className={'dot dot-red'}></span>
                    <span onClick={(e) => this.handleRadio(e)} className={'dot dot-purple'}></span>
                    <span onClick={(e) => this.handleRadio(e)} className={'dot dot-blue'}></span>
                    <span onClick={(e) => this.handleRadio(e)} className={'dot dot-lightblue'}></span>
                </div>
                <br />
                {/* Button zum Abbrechen */}
                <Button
                    onClick={() => (this.setState({ text: "", heading: false }), this.props.setModal(false), this.props.setChange(-1))}
                    variant="contained"
                    style={{ margin: '15px' }}
                > Abbrechen
                </Button>
                {/* Button Fertig */}
                {/*eslint-disable */}
                <Button onClick={(e) => this.handleButtonAccept(e)
                }
                    variant="contained"
                    style={{ margin: '15px' }}
                > Fertig
                </Button>
            </Modal>
        </div >)
    }
}

export default AddCard;
