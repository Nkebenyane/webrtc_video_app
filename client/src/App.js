import React, { Component } from 'react';
import { io } from 'socket.io-client';


class App extends Component {
  constructor(props) {
    super(props)

    // https://reactjs.org/docs/refs-and-the-dom.html
    this.localVideoref = React.createRef()
    this.remoteVideoref = React.createRef()

    this.socket = null
    this.candidate = []
  }

  componentDidMount = () => {

    this.socket = io(
      '/webrtcPeer',
      {
        path: '/webrtc',
        query: {}
      }
    )

    this.socket.on('connection-success', success => {
      console.log(success)
    })

    this.socket.on('offerOrAnswer', (sdp) => {
      this.textref.value = JSON.stringify(sdp)

      this.pc.setRemoteDescription(new RTCSessionDescription(sdp))

    })

    this.socket.on('candidate', (candidate) => {

      this.pc.addIceCandidate(new RTCIceCandidate(candidate))

    })

    // STUN SERVER
    const pc_config = {
      "iceServers": [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    }

    this.pc = new RTCPeerConnection(pc_config)

    this.pc.onicecandidate = (e) => {
      if (e.candidate)
        // console.log(JSON.stringify(e.candidate))
        this.sendToPeer('candidate', e.candidate)
    }

    // triggered when there is a change in connection state
    this.pc.oniceconnectionstatechange = (e) => {
      console.log(e)
    }

    this.pc.ontrack = (e) => {
      this.remoteVideoref.current.srcObject = e.streams[0]
    }

    // called when getUserMedia() successfully returns - see below
    const success = (stream) => {
      window.localStream = stream
      this.localVideoref.current.srcObject = stream
      this.pc.addStream(stream)
    }

    // called when getUserMedia() fails - see below
    const failure = (e) => {
      console.log('getUserMedia Error: ', e)
    }

    const constraints = {
      audio: false,
      video: true,
    }

    navigator.mediaDevices.getUserMedia(constraints)
      .then(success)
      .catch(failure)
  }

  sendToPeer = (messageType, payload) => {
    this.socket.emit(messageType, {
      socketID: this.socket.id,
      payload
    })
  }

  createOffer = () => {
    console.log('Offer')

    this.pc.createOffer({ offerToReceiveVideo: 1 })
      .then(sdp => {

        this.pc.setLocalDescription(sdp)
        this.sendToPeer('offerOrAnswer', sdp)
      })
  }

  createAnswer = () => {
    console.log('Answer')
    this.pc.createAnswer({ offerToReceiveVideo: 1 })
      .then(sdp => {

        this.pc.setLocalDescription(sdp)
        this.sendToPeer('offerOrAnswer', sdp)
      })
  }

  setRemoteDescription = () => {
    const desc = JSON.parse(this.textref.value)

    this.pc.setRemoteDescription(new RTCSessionDescription(desc))
  }

  addCandidate = () => {
    this.candidate.forEach(candidate => {
      console.log(JSON.stringify(candidate))
      this.pc.addIceCandidate(new RTCIceCandidate(candidate))
    });
  }

  render() {

    return (
      <div>
        <video
          style={{
            zIndex: 2,
            position: 'fixed',
            right: 0,
            width: 200,
            height: 200,
            margin: 5,
            backgroundColor: 'black'
          }}
          ref={this.localVideoref}
          autoPlay>
        </video>
        <video
          style={{
            zIndex: 1,
            padding: 'fixed',
            bottom: 0,
            minWidth: '100%',
            minHeight: '100%',
            backgroundColor: 'black'
          }}
          ref={this.remoteVideoref}
          autoPlay>
        </video>
        <br />

        <button onClick={this.createOffer}>Offer</button>
        <button onClick={this.createAnswer}>Answer</button>

        <br />
        <textarea ref={ref => { this.textref = ref }} />
      </div>
    )
  }
}

export default App;