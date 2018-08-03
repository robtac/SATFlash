import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';

function RenderFlashcard (props) {
    const reversed = props.reversed;
    const text = props.text;

    if (reversed != null  && text != null) {
        return (
            <View style={{ flex: 1 }}>
                <Card>
                    <Text>{text}</Text>
                </Card>
            </View>
        );
    } else {
        return (
            <View>
                <Text>Flashcard invalid</Text>
            </View>
        );
    }
}

class FlashQuiz extends Component {

    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('vocab');
        this.state = {
            reversed: false,
            isFlipped: false,
            term: '',
            definition: '',
            wordBank: ["word", "term", "test"],
            currentSet: [],
            nextSet: []
        }
    }

    componentDidMount () {
        this.nextFlashcard();
    }

    nextFlashcard () {
        var currentQuery;
        if (this.state.currentSet.length === 0) {
            currentQuery = this.ref.limit(2);
        } else {
            currentQuery = this.ref.orderBy("term").startAfter(this.state.currentSet[this.state.currentSet.length - 1].term).limit(1);
        }
        var currentArray = [];
        currentQuery.get().then((querySnapshot) => {
            if (this.state.currentSet.length === 0) {
                if (querySnapshot.docs.length === 0) { // this will never be called bc currentQuery data is from currentSet
                    this.setState ({
                        term: '',
                        definition: ''
                        // TODO: Add clause for if there are no more flashcards left
                    });
                    console.error("No more flashcards!");
                } else {
                    querySnapshot.docs.forEach((doc) => {
                        currentArray.push({term: doc.data().term, definition: doc.data().definition});
                    });
                    var card = currentArray.shift();
                    this.setState({
                        term: card.term,
                        definition: card.definition,
                        currentSet: currentArray
                    });
                }
            } else {
                if (querySnapshot.docs.length === 0) {
                    var card = this.state.currentSet.shift();
                    this.setState({
                        term: card.term,
                        definition: card.definition,
                        currentSet: this.state.currentSet
                    });
                } else {
                    currentArray = this.state.currentSet;
                    querySnapshot.docs.forEach((doc) => {
                        currentArray.push({term: doc.data().term, definition: doc.data().definition});
                    });
                    var card = currentArray.shift();
                    this.setState({
                        term: card.term,
                        definition: card.definition,
                        currentSet: currentArray
                    });
                }
            }
        })
    }

    static navigationOptions = {
        title: 'Flashcard Quiz'
    }

    render () {
        if (!this.state.isFlipped)
            cardText = this.state.term;
        else
            cardText = this.state.definition;
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity onPress={ () => this.setState({isFlipped: !this.state.isFlipped}) }>
                    <RenderFlashcard
                        reversed={this.state.reversed}
                        text={cardText}
                    />
                </TouchableOpacity>
                <Button
                    onPress={ () => this.nextFlashcard() }
                    title="Next Flashcard"
                    color="#D21F2E"
                />
            </View>
        );
    }
    
}

export default FlashQuiz;