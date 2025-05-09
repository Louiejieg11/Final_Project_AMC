import { View, 
         Text,
       StyleSheet,
         SafeAreaView,
         Image,
         ScrollView} from 'react-native';
import ImageAboutus from '../assets/aboutusImage.jpg'
export default function AboutUs() {
  return (
    <SafeAreaView style={style.container}>
      <Image source={ImageAboutus} style={style.imageAboutus} resizeMode="contain"/>
      <View style={style.content}>
         <Text style={style.title}>About Us</Text>
         <ScrollView style={style.scrollText}>
         <Text style={style.textContent}>
The system is developed by a dedicated team of professionals specializing in crime mapping, data analytics, and user experience design. Our platform efficiently maps crime scenes across the city, offering authorities a comprehensive view of crime history. By analyzing this data, law enforcement can identify patterns and trends related to specific dates and locations. This information is crucial for developing proactive strategies to prevent crime and ensure public safety.
    
         </Text>
         <Text style={style.textContent}>
         The development team includes expert UI/UX designers, backend developers, and data analysts who work collaboratively to ensure a seamless and intuitive experience for users. Our UI/UX team—led by [Team Member Name(s)]—focuses on creating an intuitive and user-friendly interface, ensuring ease of use for law enforcement officers and decision-makers. The backend development team, managed by [Team Member Name(s)], has built a secure and scalable infrastructure that supports real-time data processing and robust analytics features.
         </Text>
         <Text style={style.textContent}>
By integrating cutting-edge technology and expertise, our system serves as a valuable tool for authorities, enabling them to make informed decisions that enhance public safety and crime prevention efforts.
         </Text>
         </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    zIndex: 1
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#252728",
    fontWeight: "bold",
    paddingTop: 20
  },
  imageAboutus: {
    height: 280,
    width:500,
  },
  content: {
    position: "absolute",
    justifyContent: 'center',
    alignItems: "center",
    top: 230,
    backgroundColor: "#ffff",
    width: 360,
    height: 400,
    borderRadius: 30,
    shadowColor: '#000',             
    shadowOffset: { width: 0, height: -4 }, 
    shadowOpacity: 0.3,            
    shadowRadius: 4.65,            
    elevation: 8,   
  },
  textContent: {
    textAlign: "justify",
    color: "#252728",
    marginBottom: 30,
  },
  scrollText:{
    paddingHorizontal: 50
  }
});
