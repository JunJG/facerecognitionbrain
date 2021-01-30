import React from 'react';

class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        // Emptying the message variable in status
        this.props.setResponseMessage("");
    }

    render() {
        const {isSignedIn, message} = this.props;
        let tachTags = "ba bw2";
        if (isSignedIn) {
            tachTags += " b--green";
        }
        else {
            tachTags += " b--red";
        }
        return (
            <div>
                <h6 className={tachTags}>{message}</h6>
            </div>
        );
    }
}

// const Message = ({isSignedIn, message, setResponseMessage}) => {
//         if (isSignedIn) {
//             return (
//                 <div>
//                     <h6 className="ba bw2 b--green">{message}</h6>
//                 </div>
//                 // <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
//                     //     <p onClick={() => onRouteChange('signout')} className="f3 link dim black underline pa3 pointer">Sign Out</p>
//                     // </nav>
//             );
//         } else {
//             return (
//                 // <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
//                 //     <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign In</p>
//                 //     <p onClick={() => onRouteChange('register')} className="f3 link dim black underline pa3 pointer">Register</p>
//                 // </nav>
//                 <div>
//                     <h6 className="ba bw2 b--red">{message}</h6>
//                 </div>
//             );
//         }
// }

export default Message;