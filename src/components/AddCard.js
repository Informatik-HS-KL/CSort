import React, { Component } from 'react';
import Modal from 'react-modal'

Modal.setAppElement('#root')

class AddCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            radioValue: ".dot-white",
            heading: false,
            maxChar: 0,
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
        this.setState({ text: "", heading: false, radioValue: ".dot-white" });
        this.props.setModal(false);
    }

    render() {
        return (<div style={{ textAlign: "center" }}>
            <h4>Überschriften</h4>
            <button
                className={"button-" + this.props.theme}
                variant="contained"
                onClick={() => this.setState({ heading: true, maxChar: 20 }), this.props.setModal(true)}
                style={{ width: '11em', height: '3.5em', textAlign: 'center', /*margin: '2% 25% 2.5% 25%'*/ marginTop: '2%' }}
            >
            </button>
            <h4>Karten</h4>
            <button
                className={"button-" + this.props.theme}
                variant="contained"
                onClick={() => (this.props.setModal(true), this.setState({ modalOpen: true, maxChar: 50 }))}
                style={{ width: '10em', height: '10em', textAlign: 'center', /*margin: '2% 25% 5% 25%'*/ marginTop: '2%' }}
            >
            </button>
            {/* Modal (Fenster was sich im Vordergrund öffnet)*/}
            <Modal className={"theme-" + this.props.theme}
                isOpen={this.props.modalOpen}
                onRequestClose={() => (this.props.setModal(false), this.props.setChange(-1))}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        textAlign: 'center'
                    },
                    content: {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }

                }}>
                {/* h2 je nach dem ob Karte oder Uberschrift */}
                <div className={"legend-" + this.props.theme} style={{ height: "3.5em", paddingTop: "0.5em" }}>
                    {this.state.heading ? <h2>Überschrift erstellen</h2> : <h2>Karte erstellen</h2>}
                </div>
                <textarea
                    className={this.state.radioValue}
                    id="textarea"
                    name="text"
                    cols="35"
                    rows="4"
                    placeholder="Hier Text schreiben"
                    type="text"
                    maxLength={this.state.maxChar}
                    onChange={(t) => this.setState({ text: t.target.value })}
                >
                    {this.state.text}
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

                <button
                    className={"button-" + this.props.theme}
                    onClick={() => (this.setState({ text: "", heading: false, radioValue: ".dot-white" }), this.props.setModal(false), this.props.setChange(-1))}
                    variant="contained"
                    style={{ margin: '15px' }}
                > Abbrechen
                </button>
                {/* Button Fertig */}
                {/*eslint-disable */}

                <button
                    className={"button-" + this.props.theme}
                    onClick={(e) => this.handleButtonAccept(e)}
                    variant="contained"
                    style={{ margin: '15px' }}
                > Fertig
                </button>
            </Modal>
        </div>)
    }
}

export default AddCard;
