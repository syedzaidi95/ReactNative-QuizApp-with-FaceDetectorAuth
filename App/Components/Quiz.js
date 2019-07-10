import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default class Quiz extends Component{
    constructor(){
        super();
        this.state={
            questions_answers: [],
            CurrentQuestionNum: 0,
            rightAnswers: 0,
        }
    }

static getDerivedStateFromProps(nextProps){
    return{
        questions_answers: nextProps.data,
 }
}

answers(e){
    const {questions_answers} = this.state
console.log(questions_answers[e])
}
next(){
    if(this.state.CurrentQuestionNum < this.state.questions_answers.length - 1){
        this.setState({CurrentQuestionNum: this.state.CurrentQuestionNum + 1})
    }else{
        console.log('result')
    }
}
    render(){
        const {questions_answers, CurrentQuestionNum} = this.state;
        return(
            <View>
                <Text>{questions_answers[CurrentQuestionNum].question}</Text>

                    <View>
                        {this.answers(CurrentQuestionNum)}
                    </View>


                <TouchableOpacity onPress={()=> this.next()}>
                    <Text>Next</Text>
                </TouchableOpacity>
            </View>
        )
    }
}