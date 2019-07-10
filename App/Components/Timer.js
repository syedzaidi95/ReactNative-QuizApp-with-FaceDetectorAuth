// import React, { Component } from 'react';
// import { View, Text } from 'react-native'
// class Timer extends Component {
//     constructor() {
//         super();
//         this.state = {
//             totalTime: '',
//             time: '',
//             timer: '',
//         }
//     }
//     componentDidMount() {
//         var newTime = 60000;
//         this.state.timer = setInterval(() => {
//             var get = new Date(newTime)
//             var minute = get.getMinutes()
//             var seconds = get.getSeconds()
//             newTime = parseInt(newTime) - 1000
//             this.setState({
//                 totalTime: minute + ':' + seconds,
//                 time: newTime
//             })
//         }, 1000)

//     }
//     componentWillUnmount() {
//         clearInterval(this.state.timer)
//         this.props.time(this.state.totalTime)
//         // this.setState({time: ''})
//     }



//     render() {
//         const { totalTime, time } = this.state
//         if (time < 0) {
//              clearInterval(this.state.timer)
//             this.props.time(totalTime)
//         }
//         return (
//             <Text style={{ color: 'white', fontSize: 18 }}>{totalTime}</Text>
//         )
//     }
// }

// export default Timer