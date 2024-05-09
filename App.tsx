import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import RNFS from 'react-native-fs';
import {saveToCameraRoll} from '@react-native-community/cameraroll';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSendButton, setShowSendButton] = useState(false);

  // Function to Generate AI Art
  const handleGeneratePress = async () => {
    setIsLoading(true);
    setShowSendButton(false);
    const path =
      'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';

    const headers = {
      Accept: 'application/json',
      Authorization:
        'Bearer sk-FXFbM5LnYaDjT0Gl89xi1qo3Bx8RvnDKiBXpQQzG58mQleKA',
      'Content-Type': 'application/json',
    };

    const body = {
      steps: 40,
      width: 1024,
      height: 1024,
      seed: 0,
      cfg_scale: 5,
      samples: 1,
      text_prompts: [
        {text: inputText, weight: 1},
        {text: '(deformed iris, deformed pupils, etc.)', weight: -1},
      ],
    };

    try {
      const response = await fetch(path, {
        headers,
        method: 'POST',
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        console.error(`Error response: ${errorResponse}`);
        return;
      }

      // Extract base64 data and set it to the generatedImage state
      const responseJSON = await response.json();
      const artifact = responseJSON.artifacts[0];
      setGeneratedImage(`data:image/png;base64,${artifact.base64}`);
      setShowSendButton(true);
    } catch (error) {
      console.error('An error occurred while generating AI art:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to Write Base64 Image Data to a Local File
  const writeBase64ToFile = async base64Data => {
    const filePath = `${RNFS.DocumentDirectoryPath}/generated-wallpaper.png`;

    try {
      await RNFS.writeFile(filePath, base64Data, 'base64');
      return `file://${filePath}`;
    } catch (error) {
      console.error('Error writing base64 to file:', error);
      return null;
    }
  };

  // Function to Handle "Send to Apple Watch" Button
  const handleSendToAppleWatch = async () => {
    const base64Data = generatedImage.replace(/^data:image\/png;base64,/, '');

    const localFileUri = await writeBase64ToFile(base64Data);
    console.log(localFileUri, '🌊🌊🌊🌊what is the LOCALFILE URI? ');

    if (localFileUri) {
      try {
        await saveToCameraRoll(localFileUri, {
          type: 'photo',
          album: 'Wallpapers',
        });
        Alert.alert('Succes', 'Image saved to Wallpapers album');
      } catch (error) {
        console.error('👹 Error saving image to camera roll', error);
        Alert.alert('Error, Failed to save image to Wallpapers album');
      }
    } else {
      console.error('❌✏️ Failed to write base64 image to file.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerText}>Create your Art</Text>
        <TextInput
          style={styles.input}
          onChangeText={setInputText}
          value={inputText}
          placeholder="Enter your prompt here"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.button} onPress={handleGeneratePress}>
          <Text style={styles.buttonText}>Generate</Text>
        </TouchableOpacity>

        {isLoading && (
          <ActivityIndicator
            style={{marginTop: 20}}
            size="large"
            color="#5e4ee9"
          />
        )}

        {generatedImage !== '' && (
          <Image
            source={{uri: generatedImage}}
            style={{width: 300, height: 300, marginTop: 20}}
            resizeMode="contain"
          />
        )}

        {showSendButton && (
          <TouchableOpacity
            style={[styles.button, {marginTop: 20}]}
            onPress={handleSendToAppleWatch}>
            <Text style={styles.buttonText}>Send to Apple Watch</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    height: 40,
    width: 300,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#1c1c1c',
    borderColor: '#2e2c2c',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    color: 'white',
  },
  button: {
    backgroundColor: '#5e4ee9',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
