import React, {Component} from 'react';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { AiFillEdit } from "react-icons/ai";

class Legend extends Component {
    
    render() {
        const Button = styled.button`
            background: white;
            border-radius: 4px;
            border: none;
            color: black;
            position: absolute;
            right: 5px;
            top: 5px`
        ;          
        
        return ( 
            <div>
                Legende
                <Popup modal trigger={
                    <Button>
                        <AiFillEdit />
                    </Button>}>
                    Modal Content
                </Popup>
            </div>
        )
    }
}

export default Legend;