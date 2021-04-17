// import './App.css';
import React, { Component } from 'react';
// import Video from './components/Video';

class App extends Component {
  constructor(props) {
    super(props)

    this.localVideoref = React.createRef()
    this.remoteVideoref = React.createRef()
  }
  componentDidMount() {

    const configuration = null
    this.peerConnection = new RTCPeerConnection(configuration)

    this.peerConnection.onicecandidate = (e) => {
      if (e.candidate) {
        console.log(JSON.stringify(e.candidate))
      }
    }

    this.peerConnection.oniceconnectionstatechange = (e) => {
      console.log(e)
    }

    this.peerConnection.onaddstream = (e) => {
      this.remoteVideoref.current.srcObject = e.stream
    }

    const constraints = {
      video: true,
      audio: true
    }

    const success = (stream) => {
      window.localStream = stream
      this.localVideoref.current.srcObject = stream
      this.peerConnection.addStream(stream)
      console.log(stream)
    }

    const failure = (e) => {
      console.log('getUserMedia Error: ', e);
    }

    navigator.mediaDevices.getUserMedia(constraints)
      .then(success)
      .catch(failure)
  }

  createOffer = () =>{
    console.log('Offer')
    this.peerConnection.createOffer({
      offerToReceiveVideo: 1,
      offerToReceiveAudio: 1
    })
    .then(sdp => {
      console.log(JSON.stringify(sdp))
      this.peerConnection.setLocalDescription(sdp)
    }, e => {})
  }

  setRemoteDescription = () => {
    const desc = JSON.parse(this.textref.value)
    this.peerConnection.setRemoteDescription(new RTCSessionDescription(desc))
  }

  createAnswer = () => {
    console.log('Answer')
    this.peerConnection.createOffer({
      offerToReceiveVideo: 1,
      offerToReceiveAudio: 1
    })
    .then(sdp => {
      console.log(JSON.stringify(sdp))
      this.peerConnection.setLocalDescription(sdp)
    }, e => {})
  }

  addCandidate = () =>{
    const candidate = JSON.parse(this.textref.value)
    console.log('Adding a Candidate: ', candidate)
    this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
  }

  render() {
    return (
      <div>
        <video
          style={{
            backgroundColor: 'black',
            width: 240,
            height: 240,
            margin: 5
          }}
          ref={this.localVideoref}
          autoPlay>
        </video>
        <video
          style={{
            backgroundColor: 'black',
            width: 240,
            height: 240,
            margin: 5
          }}
          ref={this.remoteVideoref}
          autoPlay>
        </video>

        <br />
        <button onClick={this.createOffer}> Offer</button>
        <button onClick={this.createAnswer}> Answer </button>

        <br />

        <textarea ref={ref => { this.textref = ref }} />

        <br />

        <button onClick={this.setRemoteDescription}>Set Remote desc</button>
        <button onClick={this.addCandidate}>add Candidate</button>



      </div>
    );
  }
}
export default App;
