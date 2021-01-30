import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className="center ma">
            <div className='absolute mt2'>
                <img id="inputimage" alt='' src={imageUrl} width='500px' height='auto'></img>
                {box.map(faceLocation=> {
                    return (<div className='bounding-box' key={faceLocation.id}
                        style={{top:faceLocation.topRow, right: faceLocation.rightCol, bottom: faceLocation.bottomRow, left: faceLocation.leftCol}}>
                    </div>)
                })}
            </div>
        </div>
    );
    // return (
    //     <div className="center ma">
    //         <div className='absolute mt2'>
    //             <img id="inputimage" alt='' src={imageUrl} width='500px' height='auto'></img>
    //             <div className='bounding-box' 
    //                 style={{top:box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
    //             </div>
    //         </div>
    //     </div>
    // );
}

export default FaceRecognition;