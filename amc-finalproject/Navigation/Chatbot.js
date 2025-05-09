import React, {useState} from 'react'
import {View, 
        Text,
        StyleSheet, 
        FlatList,
        TouchableOpacity,
        TextInput} from 'react-native'

export default function Chatbot({close}) {
const [messages, setMessages] = useState([
      {text: "hello! How can i help you today? ",  sender: "bot"},
])

const [inputText, setInputText] = useState('')
const [loading, setLoading] = useState(false)


const API_KEY = "AIzaSyAJ0CqvNiVS_HBBId4GopO9CfI-8we4Prs"
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`

const renderMessage = ({item}) => (
  <View style={[
    styles.messageContainer,
    item.sender === "user" ? styles.userMessage: styles.botMessage
    ]}>
    <Text style={[
      styles.messageText, 
      item.sender === 'user' && styles.userMessageText
    ]}>{item.text}</Text>
  </View>
)

const handleSend = async () => {
  if(!inputText.trim()) return
  const userMessage = {text: inputText, sender: 'user'}
  setMessages(prev => [...prev, userMessage])
  setInputText ('')
  setLoading(true)

 try {
        const requestBody = { 
            contents: [{ parts: [{ text: inputText }] }]
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) throw new Error('API request failed'); 

        const data = await response.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, hindi kita magets'; 

        setMessages(prev => [...prev, { text: responseText, sender: 'bot' }]);
      } catch (error) {
          setMessages(prev => [...prev, {
              text: 'Sorry, ako ang MALI',
              sender: 'bot'
          }]);
    } finally {
        setLoading(false);
    }
};
  return(
          <View style={styles.container}>
          
          <TouchableOpacity onPress={close} style={styles.closeButton}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

            <FlatList
              data={messages}
              renderItem={renderMessage}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.messagesList}
              />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Type your message...."
                placeholderTextColor="#9999"
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>

          </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: "#007AFF"
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: "#E5E5Ea"
  },
  messageText: {
    fontSize: 16,

  }, 
  userMessageText: {
    color: "#fff"
  },
  inputContainer: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#fff",
    borderTopWidth: 1, 
    borderTopColor: "#ddd"
  },
  input: {
    flex: 1, 
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  sendButtonText: {
    color: "#ffff",
    fontSize: 16,
    fontWeight: 'bold'
  }, 
  closeButton: {
  alignSelf: 'flex-end',
  zIndex: 1000,
  backgroundColor: '#F0F0F0',
  width: 26,
  height: 26,
  borderRadius: 16,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 10,
  marginRight: 12
},
closeText: {
  color: 'black',
  fontSize: 12,
  fontWeight: 'bold',
},

})


