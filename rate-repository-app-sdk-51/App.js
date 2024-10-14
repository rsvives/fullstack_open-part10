import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
// import {  } from 'react-native-web';

export default function App() {

const [text,setText]=useState('')

const handleChange = (ev)=>{
  setText(ev.target.value)
}
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>React Native!⚛️🚀</Text>
      <Text>text:{text}</Text>
      <TextInput style={styles.input} id='text' value={text} inputMode='search'  keyboardType='default' onChangeText={setText} />
      <Pressable style={styles.button} onPress={()=>Alert.alert('You pressed the text!')}><Text style={styles.buttonText}>Hola mundo</Text></Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1:{
    fontSize:32,
    fontWeight:'800'
  },
  subtitle:{
    fontSize:16
  },
  input: {
    height: 40,
    width:'80%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button:{
    padding:12,
    backgroundColor:'#4af',
    borderRadius:4
  },
  buttonText:{
    color: '#fff'
  }
});
