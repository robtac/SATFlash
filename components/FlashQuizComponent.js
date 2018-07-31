import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';

function RenderFlashcard (props) {
    const reversed = props.reversed;
    const term = props.term;
    const definition = props.definition;

    if (reversed != null  && term !== null && definition != null) {
        return (
            <View>
                <Card>
                    <Text>reversed: {reversed}</Text>
                    <Text>term: {term}</Text>
                    <Text>definition: {definition}</Text>
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
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <RenderFlashcard
                    reversed={this.state.reversed}
                    term={this.state.term}
                    definition={this.state.definition}
                    />
            </View>
        );
    }
    
}

export default FlashQuiz;