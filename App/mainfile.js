import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { FetchQuizApi } from './API,s/quizapi'
import Quiz from './Components/Quiz';
import FaceCamera from './Components/faceDetector'

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            questions_answers: [],
            quiz: false,
            auth: false,
        }
        this.quizUnmount = this.quizUnmount.bind(this)
        this.faceAuth = this.faceAuth.bind(this)
    }
    componentDidMount() {
        this.getData()

    }

    async getData() {
        try {
            const data = await FetchQuizApi()
            let array = data.map((e) => {
                return obj = {
                    question: e.question,
                    incorrect_answers: e.incorrect_answers,
                    correct_answer: e.correct_answer
                }
            })
            this.setState({ questions_answers: array })
        } catch (e) { console.log('error == > ', e) }
    }
    faceAuth(){
        this.setState({auth: true})
    }
    quizUnmount(){
        this.setState({quiz: false})
        this.getData()
    }

    render() {
        const {questions_answers, quiz, auth} = this.state
        return (
            <View style={{width: '100%' , flex: 1, }}>
            {auth && quiz && !!questions_answers.length && <Quiz unMount={this.quizUnmount} data={questions_answers} />}
            {!auth && !quiz && <View style={{flex: 0.70}}><FaceCamera faceAuth={this.faceAuth} /></View>}
            {auth && !quiz && <View style={{flex: 1, justifyContent: 'space-around' , alignItems: 'center'}}><Button onPress={()=>{this.setState({quiz: true})}} title='Start Quiz' /></View>}
            </View>
        )
    }
};

const styles = StyleSheet.create({

})