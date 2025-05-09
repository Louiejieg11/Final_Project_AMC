import {useState} from 'react'
import imageBackground from "./assets/imageBackground.jpg";
import Chatbot from './Navigation/Chatbot'

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";

export default function Main() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <View style={style.container}>
      {/*--------------------------CONTENT----------------------------*/}
      <View style={style.content}>
        <View style={{ marginBottom: 5 }}>
          <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
            <Text style={{ fontSize: 24, color: "#0062d1" }}>CRIME</Text> HOTSPOT
          </Text>
          <Text style={{ fontSize: 18, color: "#0062d1", fontWeight: "bold", textAlign: "center" }}>
            <Text style={{ fontSize: 24, color: "black" }}>MAPPING</Text> SYSTEM
          </Text>
        </View>
        <Text style={{ textAlign: "justify", color: "gray" }}>
          Ensuring the city is safe is a top priority for authorities. They work continuously to prevent
          crime and protect the community.
        </Text>
        <Image source={imageBackground} style={style.imageBackground} resizeMode="cover" />
        <TouchableOpacity style={style.buttonAi} onPress={() => setIsOpen(true)}>
            <Text style={style.textAi}>ChatBot</Text>
        </TouchableOpacity>

      {isOpen && (
        <View style={style.modalOverlay}>
          <View style={style.modalContent}>
            <Chatbot close={() => setIsOpen(false)} />
          </View>
        </View>
      )}

      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 30,
    backgroundColor: "#ffffff",
  },

  content: {
    flex: 1,
    alignItems: "center",
    marginVertical: 50,
  },
  imageBackground: {
    marginTop: 5,
    height: "60%",
    width: 500,
  },
  buttonAi: {
    backgroundColor: "#0062d1",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    width: "50%",
 

  },
  textAi: {
    textAlign: 'center',
    color: '#ffff',
    fontWeight: 'bold',

  },
modalOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#fff',
  zIndex: 9999,
  justifyContent: 'flex-start',
},

modalContent: {
  flex: 1,
},



});
