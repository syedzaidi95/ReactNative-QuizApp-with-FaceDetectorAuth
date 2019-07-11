import React, { Component } from 'react';
import { View, Text } from 'react-native'
class Timer extends Component {
    constructor() {
        super();
        this.state = {
            totalTime: '',
            time: 60000,
            timer: '',
            timeRun: true,
        }
    }
    static getDerivedStateFromProps(nextProps){
        return{
            timeRun: nextProps.timeRun
        }
    }

   componentDidMount(){
    var newTime = 60000;
    this.state.timer = setInterval(() => {
        var get = new Date(newTime)
        var minute = get.getMinutes()
        var seconds = get.getSeconds()
        newTime = parseInt(newTime) - 1000
        this.setState({
            totalTime: minute + ':' + seconds,
            time: newTime
        })
    }, 1000)
   }

    // componentWillUnmount() {
    //     clearInterval(this.state.timer)
    //     this.props.time(this.state.totalTime)
    // }



    render() {
        const { totalTime, time, timeRun } = this.state
        // if(!timeRun || time < 1000){
        //     // clearInterval(totalTime)
        //     this.props.time(totalTime)
        // }
        return (
            <Text style={{ color: 'white', fontSize: 18 }}>{totalTime}</Text>
        )
    }
}

export default Timer