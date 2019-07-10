import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, Alert, Modal, Button } from 'react-native';
// import Timer from './Timer'

export default class Quiz extends Component {
    constructor() {
        super();
        this.state = {
            questions_answers: [],
            CurrentQuestionNum: 0,
            rightAnswers: 0,
            selectedValue: '',
            trueAnswer: '',
            modalVisible: false,
            timer: false,
            time: '',
        }
        // this.unMountTimer = this.unMountTimer.bind(this)
        // this.time = this.time.bind(this)
    }
    closeModal(){
        this.setModalVisible(!this.state.modalVisible)
        this.props.unMount()
    }
    componentDidMount() {
        this.setState({ timer: true })
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible, questions_answers : [], CurrentQuestionNum: 0, selectedValue: '', rightAnswers: 0, trueAnswer: '', time: ''});
    }
    static getDerivedStateFromProps(nextProps) {
        return {
            questions_answers: nextProps.data,
        }
    }
    next() {
        const { selectedValue, rightAnswers, questions_answers, trueAnswer, CurrentQuestionNum } = this.state
        if (CurrentQuestionNum < questions_answers.length - 1) {
            this.setState({ CurrentQuestionNum: CurrentQuestionNum + 1, rightAnswers: selectedValue === trueAnswer ? rightAnswers + 1 : rightAnswers + 0, selectedValue: '' })
        } else {
            this.setState({ timer: false, rightAnswers: selectedValue === trueAnswer ? rightAnswers + 1 : rightAnswers + 0, selectedValue: '', modalVisible: true })
        }
    }
    // unMountTimer(time) {
    //     this.setState({ timer: false })
    // }
    // time(time) {
    //     // var get = new Date(time)
    //     // var minute = get.getMinutes()
    //     // var seconds = get.getSeconds()
    //     this.setState({time: time, selectedValue: '', modalVisible: true})
    // }
    render() {
        const { questions_answers, CurrentQuestionNum, trueAnswer, rightAnswers, time } = this.state;
        if (trueAnswer !== questions_answers[CurrentQuestionNum].correct_answer) {
            this.setState({ trueAnswer: questions_answers[CurrentQuestionNum].correct_answer })
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#F0F1F5', width: '100%' }}>
                <View style={{ shadowColor: 'black', elevation: 15, flex: 0.35, flexDirection: 'column', paddingTop: 25, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#0B4CA5', borderBottomStartRadius: 50, borderBottomEndRadius: 50 }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Question: {CurrentQuestionNum + 1 + ' of ' + questions_answers.length}</Text>
                    <Text style={{ color: 'white', fontSize: 20, margin: 30, textAlign: 'center' }}>{questions_answers[CurrentQuestionNum].question}</Text>
                    <View style={{ backgroundColor: 'green', width: 100, height: 30, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                        {/* <Timer  time={this.time} /> */}
                    </View>
                </View>
                <View style={{ flex: 0.70, backgroundColor: '#F0F1F5', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { this.setState({ selectedValue: questions_answers[CurrentQuestionNum].correct_answer }) }} style={{ overFlow: 'hidden', width: '75%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', height: 50, borderRadius: 50, shadowColor: 'black', elevation: 15 }} >
                        <Text style={{ fontSize: 20 }}>{questions_answers[CurrentQuestionNum].correct_answer}</Text>
                    </TouchableOpacity>
                    {questions_answers[CurrentQuestionNum].incorrect_answers.map((e) => {
                        return (
                            <TouchableOpacity onPress={() => { this.setState({ selectedValue: e }) }} style={{ overFlow: 'hidden', width: '75%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', height: 50, borderRadius: 50, shadowColor: 'black', elevation: 15, }} key={e}>
                                <Text style={{ fontSize: 20 }}>{e}</Text>
                            </TouchableOpacity>
                        )
                    })}
                    <View style={{ flexDirection: 'row' }}>
                        {this.state.selectedValue !== '' && <View style={{ padding: 10, margin: 10, width: '60%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', height: 50, borderRadius: 50, shadowColor: 'green', elevation: 15, }}><Text>{this.state.selectedValue}</Text></View>}
                        <TouchableOpacity style={{ margin: 10, overFlow: 'hidden', shadowColor: 'black', elevation: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B4CA5', width: 50, height: 50, borderRadius: 100 }} onPress={() => this.next()}>
                            <Text style={{ color: 'white' }} >Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{ marginTop: 22, }}>
                        <View>
                            {!!questions_answers.length && <Text>{'Right Answer ' + rightAnswers + ' of ' + questions_answers.length}</Text>}
                            <Text>{((rightAnswers * 100)  / questions_answers.length)+ '%'}</Text>
                                <Button onPress={()=>this.closeModal()} title='Try Again'/>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}