(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{41:function(e,t,n){},74:function(e,t,n){"use strict";n.r(t);var c=n(6),o=n.n(c),i=n(31),r=n.n(i),a=(n(41),n(32)),s=n(33),d=n(36),f=n(35),l=n(34),u=n(0),b=function(e){Object(d.a)(n,e);var t=Object(f.a)(n);function n(e){var c;return Object(a.a)(this,n),(c=t.call(this,e)).componentDidMount=function(){c.socket=Object(l.io)("/webrtcPeer",{path:"/webrtc",query:{}}),c.socket.on("connection-success",(function(e){console.log(e)})),c.socket.on("offerOrAnswer",(function(e){c.textref.value=JSON.stringify(e),c.pc.setRemoteDescription(new RTCSessionDescription(e))})),c.socket.on("candidate",(function(e){c.pc.addIceCandidate(new RTCIceCandidate(e))}));c.pc=new RTCPeerConnection({iceServers:[{urls:"stun:stun.l.google.com:19302"}]}),c.pc.onicecandidate=function(e){e.candidate&&c.sendToPeer("candidate",e.candidate)},c.pc.oniceconnectionstatechange=function(e){console.log(e)},c.pc.ontrack=function(e){c.remoteVideoref.current.srcObject=e.streams[0]};navigator.mediaDevices.getUserMedia({audio:!1,video:!0}).then((function(e){window.localStream=e,c.localVideoref.current.srcObject=e,c.pc.addStream(e)})).catch((function(e){console.log("getUserMedia Error: ",e)}))},c.sendToPeer=function(e,t){c.socket.emit(e,{socketID:c.socket.id,payload:t})},c.createOffer=function(){console.log("Offer"),c.pc.createOffer({offerToReceiveVideo:1}).then((function(e){c.pc.setLocalDescription(e),c.sendToPeer("offerOrAnswer",e)}))},c.createAnswer=function(){console.log("Answer"),c.pc.createAnswer({offerToReceiveVideo:1}).then((function(e){c.pc.setLocalDescription(e),c.sendToPeer("offerOrAnswer",e)}))},c.setRemoteDescription=function(){var e=JSON.parse(c.textref.value);c.pc.setRemoteDescription(new RTCSessionDescription(e))},c.addCandidate=function(){c.candidate.forEach((function(e){console.log(JSON.stringify(e)),c.pc.addIceCandidate(new RTCIceCandidate(e))}))},c.localVideoref=o.a.createRef(),c.remoteVideoref=o.a.createRef(),c.socket=null,c.candidate=[],c}return Object(s.a)(n,[{key:"render",value:function(){var e=this;return Object(u.jsxs)("div",{children:[Object(u.jsx)("video",{style:{width:240,height:240,margin:5,backgroundColor:"black"},ref:this.localVideoref,autoPlay:!0}),Object(u.jsx)("video",{style:{width:240,height:240,margin:5,backgroundColor:"black"},ref:this.remoteVideoref,autoPlay:!0}),Object(u.jsx)("br",{}),Object(u.jsx)("button",{onClick:this.createOffer,children:"Offer"}),Object(u.jsx)("button",{onClick:this.createAnswer,children:"Answer"}),Object(u.jsx)("br",{}),Object(u.jsx)("textarea",{ref:function(t){e.textref=t}})]})}}]),n}(c.Component),p=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,75)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),c(e),o(e),i(e),r(e)}))};r.a.render(Object(u.jsx)(o.a.StrictMode,{children:Object(u.jsx)(b,{})}),document.getElementById("root")),p()}},[[74,1,2]]]);
//# sourceMappingURL=main.d74c1367.chunk.js.map