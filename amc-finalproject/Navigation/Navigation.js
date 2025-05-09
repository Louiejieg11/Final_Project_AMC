import { useState, useEffect } from 'react';
import Main from '../Main';
import AboutUs from './AboutUs';
import Mapping from './Mapping';
import Reporting from './Reporting';
import Logo from '../assets/logo.png';
import User from '../assets/user.png'
import { View, StyleSheet, Animated, TouchableOpacity, Image, Text } from 'react-native';
import { Menu, X, Home, CircleHelp, Map, FileText, LogOut, Settings } from 'lucide-react-native';



export default function Navigation({ onLogOut, role }) {
  const [screen, setScreen] = useState("Homepage");
  const [visible, setVisible] = useState(false);
  

  const slideAnim = useState(new Animated.Value(-300))[0];



  const toggleMenu = () => {
    Animated.timing(slideAnim, {
      toValue: visible ? -300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setVisible(!visible);
  };

  const renderScreen = () => {
    if (screen === "Homepage") return <Main currentScreen={screen}/>;
    if (screen === "About") return <AboutUs />;
    if (screen === "Mapping") return <Mapping />;
    if (screen === "Reporting") return <Reporting />;
    return null;
  };

  const navData = [
    { id: 1, title: "Mapping", screen: "Mapping", icon: Map },
    { id: 2, title: "Reports", screen: "Reporting", icon: FileText },
    { id: 3, title: "About Us", screen: "About", icon: CircleHelp  },
  ];
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setVisible(false);
  }, [screen]);


  return (
    <View style={styles.container}>

      <View style={styles.containerHeader}>
        <TouchableOpacity onPress={toggleMenu} style={{ padding: 8 }}>
          {visible ? (
            <X size={28} color="#0062D1" />
          ) : (
            <Menu size={28} color="#0062D1" />
          )}
        </TouchableOpacity>

        <Image source={Logo} style={{ width: 40, height: 40 }} />
      </View>

      {visible && (
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={toggleMenu} />
      )}
  
      <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}>
      <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 10}}>
        <View style={{backgroundColor: "#EFEEEA", height: 120,
                       width: 120, borderRadius: "50%", alignItems: "center",
                      justifyContent: "center"}}>
          <Image source={User} style={{width: 70, height: 70}} />
      </View>
       <Text style={{textAlign: 'center', fontWeight: '800',
                     textTransform: "uppercase", fontSize: 18,
                     marginTop: 5, color: '#43455C'}}> Welcome, {role}! </Text>
      </View>
        {[
          { title: "Home", screen: "Homepage", icon: Home },
          ...navData,
          { title: "Log Out", icon: LogOut, action: onLogOut },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                if (item.screen) setScreen(item.screen);
                if (item.action) {
                    Animated.timing(slideAnim, {
                      toValue: -300,
                      duration: 300,
                      useNativeDriver: true,
                    }).start(() => {
                      setVisible(false);
                      item.action();
                    });
                  } else {
                    setVisible(false);
                  }
               
              }}
            >
              <View style={[
                              styles.iconTextContainer,
                              item.screen && item.screen === screen && styles.activeBorder
                            ]}>
                {Icon && <Icon size={18} color={item.screen && item.screen === screen ? "#ffff" : "#252728"} style={{ marginRight: 8 }} />}
                <Text style={[styles.menuText,  { color: item.screen && item.screen === screen ? "#ffff" : "#252728" }]}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </Animated.View>

      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    paddingHorizontal: 30,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.1)",
    zIndex: 2,
  },
  menu: {
    position: "absolute",
    top: 85,
    left: 10,
    width: 250,
    height: 550,
    bottom: 0,
    backgroundColor: "#ffff",
    zIndex: 2,
    borderRadius: 30,
    justifyContent: 'center',
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  menuText: {
    fontSize: 16,
    letterSpacing: 1,
  },
  iconTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 15,
    gap: 5,
  },
    activeBorder: {
    backgroundColor: '#0E32AD',
    padding: 10,
    width: '100%',
    borderRadius: 10,
  },
});
