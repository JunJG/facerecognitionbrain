import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Message from './components/Message/Message';
import Particles from 'react-particles-js';
import './App.css';


const particlesOptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};
const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    boxArray: [],
    route: 'signin',
    isSignedIn: false,
    message: '',
    user: {
      email: '',
      id: '',
      name: '',
      entries: 0,
      joined: ''
    }
};

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
        email: data.email,
        id: data.id,
        name: data.name,
        entries: data.entries,
        joined: data.joined
    }});
  }

  calculateAllFaceLocation = (data) => {
    const image= document.getElementById('inputimage');
    const width = Number(image.width); // image.width is in a string format
    const height = Number(image.height); // Also same with height

    const boundingBoxArr = data.outputs[0].data.regions;
    let boundingBoxResults = [];
    boundingBoxArr.forEach(box => {
      let sAccess = box.region_info.bounding_box;
      let sId = box.id;
      let boxObj = {
        leftCol: sAccess.left_col * width,
        topRow: sAccess.top_row * height,
        rightCol: width - (sAccess.right_col * width),
        bottomRow: height - (sAccess.bottom_row * height),
        id: sId
      };
      boundingBoxResults.push(boxObj);
    });
    
    return boundingBoxResults;
  }


  displayFaceBox = (box) => {
    this.setState({boxArray: box});
  }

  setResponseMessage = (msg) => {
    this.setState({message: msg});
  }

  displayResponseMessage = () => {
    console.log("From App.js side.. Message is: ", this.state.message);
    // console.log('Now returning the message to the method');
    return this.state.message;
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    // Bounding box is in response.outputs[0].data.regions[0].region_info.bounding_box
    // response.outputs[0].data.regions (regions is an Array consisting of however many faces the model detects)
    // regions is an array that consists of all possible faces detected. 8 faces means from 0-7
    // regions[#].region_info.bounding_box is the same throughout all the arrays

    // "a403429f2ddf4b49b307e318f00e528b" is face-det model
    // 'https://radiant-beyond-61258.herokuapp.com/imageurl'
    // 'http://localhost:3000/imageurl'
    fetch('https://radiant-beyond-61258.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => { 
      if (response) {
        // 'https://radiant-beyond-61258.herokuapp.com/image'
        // 'http://localhost:3000/image'
        fetch('https://radiant-beyond-61258.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        }).then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}));
          })
          .catch(console.log);
      }
      this.displayFaceBox( this.calculateAllFaceLocation(response) );
      console.log('Printing dataResponse:', response);
    })
    .catch(err => console.log(err)); 
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if ((this.state.message !== prevState.message)) {
  //     console.log('In the componentDidUpdate section');
  //     <Message isSignedIn={this.state.isSignedIn} message={this.state.message}/>
  //   }
  // }

  render() {
    return (
      <div className="App">
        <Particles className="particles"
              params={particlesOptions}
            />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {/* { this.state.isSignedIn === true ? <Message isSignedIn={this.state.isSignedIn}/> :
          <Message isSignedIn={this.state.isSignedIn}/>} */}
        {/* <Message isSignedIn={this.state.isSignedIn} message={this.state.message}/> */}
        
        { this.state.route === 'home'
          ? 
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={this.state.boxArray} imageUrl={this.state.imageUrl}/>
            {this.state.message.length > 0 ? <Message isSignedIn={this.state.isSignedIn} 
                  message={this.state.message} setResponseMessage={this.setResponseMessage}/> :
                  null}
          </div>
          : ( this.state.route === 'signin' || this.state.route === 'signout' ?
              <div>
                <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} 
                  displayResponseMessage={this.displayResponseMessage}
                  setResponseMessage={this.setResponseMessage}/>
                {this.state.message.length > 0 ? <Message isSignedIn={this.state.isSignedIn} 
                  message={this.state.message} setResponseMessage={this.setResponseMessage}/> :
                  null}
              </div>
              :
              <div>
                <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}
                  displayResponseMessage={this.displayResponseMessage}
                  setResponseMessage={this.setResponseMessage}/>
                {this.state.message.length > 0 ? <Message isSignedIn={this.state.isSignedIn} 
                  message={this.state.message} setResponseMessage={this.setResponseMessage}/> :
                  null}
              </div>
            )
        }
      </div>
    );
  }
}

export default App;
