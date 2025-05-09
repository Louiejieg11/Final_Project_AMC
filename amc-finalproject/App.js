import { useState } from 'react';
import {  SafeAreaView,
          StyleSheet,
          Modal,
          View,
          Text,
          TouchableOpacity } from 'react-native';
        
import Login from './Login';
import Admin from './Admin';
import Navigation from './Navigation/Navigation';

export default function App() {
  const [role, setRole] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogin = (userRole) => {
    setRole(userRole);
  };

  const handleLogout = () => {
    setIsModalVisible(true);
  };

  const confirmLogout = () => {
    setIsModalVisible(false);
    setRole(null);
  };

  const cancelLogout = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {role === null && <Login onLogIn={handleLogin} />}
      {role === "user" && <Navigation role={role} onLogOut={handleLogout}  />}
      {role === "louiejie" && <Navigation role={role} onLogOut={handleLogout} />}
      {role === "admin" && <Admin onLogOut={handleLogout} />}

      <Modal
        transparent
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={cancelLogout}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Do you want to logout?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#D94559' }]}
                onPress={confirmLogout}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                onPress={cancelLogout}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalBox: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10,
    width: 280,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

