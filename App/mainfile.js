import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FetchQuizApi } from './API,s/quizapi'
import Quiz from './Components/Quiz';
export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            questions_answers: [],

        }
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

    render() {
        const {questions_answers} = this.state
        return (
            <View>
            {!!questions_answers.length && <Quiz data={questions_answers} />}
            </View>
        )
    }
};

const styles = StyleSheet.create({

})