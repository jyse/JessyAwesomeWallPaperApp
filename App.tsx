import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const App = () => {
  const [inputText, setInputText] = useState('');

  const handleGeneratePress = () => {
    // Placeholder for generate button functionality
    console.log('Generate button pressed with input:', inputText);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerText}>WallPaper Generator</Text>
        <TextInput
          style={styles.input}
          onChangeText={setInputText}
          value={inputText}
          placeholder="Enter your prompt here"
        />
        <TouchableOpacity style={styles.button} onPress={handleGeneratePress}>
          <Text style={styles.buttonText}>Generate</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50, // Adjust this value to control the vertical offset from the top
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    height: 40,
    width: 300,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#61dafb',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
