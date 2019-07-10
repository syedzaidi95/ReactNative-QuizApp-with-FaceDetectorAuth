import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { FetchQuizApi } from './API,s/quizapi'
import Quiz from './Components/Quiz';

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            questions_answers: [],
            quiz: false,
        }
        // this.result = this.result.bind(this)
        this.quizUnmount = this.quizUnmount.bind(this)
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

    // result(){
    //     this.getData()
    // }
    quizUnmount(){
        this.setState({quiz: false})
        this.getData()
    }

    render() {
        const {questions_answers, quiz} = this.state
        return (
            <View>
            {quiz && !!questions_answers.length && <Quiz unMount={this.quizUnmount} data={questions_answers} />}
            {!quiz && <Button onPress={()=>{this.setState({quiz: true})}} title='Start Quiz' />}
            </View>
        )
    }
};

const styles = StyleSheet.create({

})