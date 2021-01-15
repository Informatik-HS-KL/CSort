import React, {Component} from 'react';

class LegendTag extends Component { 

    render() {
        return( 
            <div className={"Shadow_Element textBox-" +this.props.theme}>  
                <span className={'dotL dot-' + this.props.color}></span>
                <input
                    className={"legend_input textBox-" + this.props.theme} 
                    name="text" 
                    placeholder = "Legendenattribut"
                    type = "text"                                 
                    maxLength= "20"            
                    value= {this.props.valueAtIndex}
                    onChange={this.props.handleLegendTagChange(this.props.arrayIndex)}                   
                    >
                </input>
            </div>
        )     
    }
}

export default LegendTag;