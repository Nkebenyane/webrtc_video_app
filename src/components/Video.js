import React from 'react';


const Video = (props) => {
return(
    <video>
        <h1>To do</h1>
        <p>this i what we do: {props.tasks.join(', ')}</p>
    </video>
);
} 
export default Video;