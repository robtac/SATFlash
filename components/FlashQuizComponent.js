import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

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
            isFlipped: true,
            term: '',
            definition: ''
        }
    }

    componentDidMount () {
        var docRef = this.ref.doc('word');
        docRef.get().then((doc) => {
            if (doc.exists) {
                let term = doc.data().term;
                let definition = doc.data().definition;
                this.updateFlashcard(term, definition);
            } else   
                console.log("No such document found");
        }).catch(function(error) {
            console.log("Error getting document: ", error);
        })
    }

    updateFlashcard (term, definition) {
        console.log("I'm updateFlashcard!");
        this.setState({
            term: term,
            definition: definition
        });
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
            </View>
        );
    }
    
}

export default FlashQuiz;