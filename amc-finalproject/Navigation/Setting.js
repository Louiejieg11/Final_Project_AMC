import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function Setting() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
      </Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}

const lightStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  text: { color: '#252728', fontSize: 20, marginBottom: 20 },
});

const darkStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#252728', justifyContent: 'center', alignItems: 'center' },
  text: { color: '#fff', fontSize: 20, marginBottom: 20 },
});
