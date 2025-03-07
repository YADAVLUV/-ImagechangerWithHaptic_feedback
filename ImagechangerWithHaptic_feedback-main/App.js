import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import React, { useState, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import image1 from './images/wallpaperflare.com_wallpaper copy 4.jpg';
import image2 from './images/wallpaperflare.com_wallpaper copy 8.jpg';
import image3 from './images/wallpaperflare.com_wallpaper copy 12.jpg';
import image4 from './images/wallpaperflare.com_wallpaper-3 copy 2.jpg';
import image5 from './images/Screenshot 2024-10-13 at 12.14.13 PM.png';
import image6 from './images/wallpaperflare.com_wallpaper copy 5.jpg';

export default function App() {
  const data = [
    { id: '1', image: image1 },
    { id: '2', image: image2 },
    { id: '3', image: image3 },
    { id: '4', image: image4 },
    { id: '5', image: image5 },
    { id: '6', image: image6 },
  ];

  const [presentImage, setPresentImage] = useState(data[0]);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const changeImage = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start(() => {
      let curr = data.findIndex(item => item.id === presentImage.id);
      let nextIndex = (curr + 1) % data.length;
      setPresentImage(data[nextIndex]);
    });

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  return (
    <LinearGradient colors={['#ff9a9e', '#fad0c4']} style={styles.container}>
      <Text style={styles.title}>Image Viewer</Text>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image source={presentImage.image} style={styles.imageContainer} />
      </Animated.View>
      <TouchableOpacity style={styles.button} onPress={changeImage}>
        <LinearGradient
          colors={['#6a11cb', '#2575fc']}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>Next Image</Text>
        </LinearGradient>
      </TouchableOpacity>
      <StatusBar style="light" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'sans-serif-medium',
  },
  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  button: {
    marginTop: 20,
    borderRadius: 30,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
