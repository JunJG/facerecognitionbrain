import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        };
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    // onSubmitSignIn = () => {
    //     // 'https://radiant-beyond-61258.herokuapp.com/register'
    //     fetch('http://localhost:3000/register', {
    //         method: 'post',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({
    //             email: this.state.email,
    //             password: this.state.password,
    //             name: this.state.name

    //         })
    //     }).then(response => response.json())
    //         .then(user => {
    //             if (user.id) {
    //                 this.props.loadUser(user);
    //                 this.props.onRouteChange('home');
    //             } else {
    //                 console.log('Error, what is data?', user);
    //                 // Can use 'user' to grab the json that I've written from the back-end
    //                 // and probably create an error component to show up
    //             }
    //         });
    // }

    onSubmitSignIn = () => {
        // 'https://radiant-beyond-61258.herokuapp.com/register'
        // 'http://localhost:3000/register'
        fetch('https://radiant-beyond-61258.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name

            })
        }).then(response => {
            // console.log('Response is :', response);
            return Promise.resolve({'json': response.json(), 'status': response.status});
        })
            .then(data => {
                // console.log('What is returned from promise.resolve?', data);
                if (data.status === 200) {
                    data.json.then(resJson => {
                        if (resJson) {
                            // console.log('Printing out data from register fetch:', resJson);
                            // console.log(`Signing you in... Welcome back ${resJson.name}!`);
                            this.props.setResponseMessage(`Registering you now.. Welcome ${resJson.name}!`);
                            // this.props.displayResponseMessage();

                            this.props.loadUser(resJson);
                            this.props.onRouteChange('home');
                        }
                    });
                }
                else {
                    // "Wrong email or password" response back from server side
                    data.json.then(message => {
                        // console.log("Message: ",message);
                        this.props.setResponseMessage(message);
                    });
                }
            })
            .catch(err => {console.log('ERROR: Failed to handle register', err)});
    }

    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" name="name"  id="name" onChange={this.onNameChange}/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" name="email-address"  id="email-address" onChange={this.onEmailChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" value="Register" />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;