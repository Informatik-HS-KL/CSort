import React, {Component} from 'react';

class LegendTag extends Component {
    render() {
        return( 
            <div className="Shadow_Element">  
                <span className={'dot dot-' + this.props.color}></span>
                <input
                    className="legend_input" 
                    name="text" 
                    placeholder = "Legendenattribut"
                    type = "text"                                 
                    maxLength= "30"                              
                    >
                </input>
            </div>
        )     
    }
}

export default LegendTag;