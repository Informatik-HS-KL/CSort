import React, {Component} from 'react';
import axios from 'axios';

/*Button zum hochladen eines Bildes als Boardhintergrund */

class DisplayImage extends Component {

    constructor(props) {
      super(props);
      this.state = {
        image: null
      };
      this.onImageChange = this.onImageChange.bind(this);
    }

    onImageChange = event => {
      if (event.target.files && event.target.files[0]) {
        let img = event.target.files[0];
        console.log("Hier " + event.target.files[0]);
        this.setState({
          image: URL.createObjectURL(img)
        });
        const data = new FormData();
        data.append('username', 'test');
        data.append('filetype', 'background');
        data.append('file', event.target.files[0]);
        axios.post("http://localhost:8000/upload_background", data, { // receive two parameter endpoint url ,form data 
            })
            .then(res => { // then print response status
            console.log(res.statusText)
            });
      }
    };


    render() {
      return (

            <div style={{background:`url('${process.env.PUBLIC_URL}/test/background.png')`, width:'100%', height:'100%', backgroundSize:'contain', backgroundRepeat:'no-repeat'}}>
              <label for="ImageUpload" class="ImageInput"></label>
              <input id="ImageUpload" type="file" name="myImage" onChange={this.onImageChange} />
            </div>

      );
    }
  }
  export default DisplayImage;

 

