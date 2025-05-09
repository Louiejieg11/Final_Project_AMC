import { View, Text, Button } from 'react-native';

export default function Admin({ onLogOut }) {
  return (
    <View>
      <Text>Welcome to ADMIN Malawak</Text>
      <Button
        title="Log Out"
        onPress={() => {
          onLogOut();
        }}
      />
    </View>
  );
}
