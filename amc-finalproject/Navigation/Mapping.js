import {useState} from 'react'
import Frame from '../assets/Frame.png'
import Frame2 from '../assets/Frame2.png'
import { View,
         ScrollView,
         Text,
         Image,
         TouchableOpacity,
         StyleSheet} from 'react-native';
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import {ChevronLeft} from 'lucide-react-native'


export default function Mapping(){
  const [currentScreen, setCurrentScreen] = useState('main')
  const [selectedItem, setSelectedItem] = useState(null)

  const items = [
     {id: 1, totalCase: 20, crimeRate: 'Low Crime Rate Area',
     lastUpated: "April, 7 2025(5:00 PM)", caseSolved: 14,
     peakCrime: "6:25 PM - 8: 00AM", data:[1, 2, 3, 0, 3, 6, 4] ,},

    {id: 2, totalCase: 120, crimeRate: 'High Crime Rate Area',
     lastUpated: "June, 7 2024(5:00 PM)", caseSolved: 32,
     peakCrime: "8:30 PM - 10: 00AM", data: [50, 10, 40, 95, 85, 91, 35]},

    ]

  const colors = ["#fbff00", "#1eff00","#ffaa00","#d32727"]
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', ];

  const handleClick = (item) => {
    setCurrentScreen('details')
    setSelectedItem(item)
  } 
  const goBack = () => {
    setCurrentScreen('main')
    setSelectedItem(null)
  }

  return (
      <View>
        {currentScreen === 'main' ? (
          <ScrollView>
              <View style={style.container}>

                <Text style={style.title}>Cluster Category</Text>

                <View style={style.categoryContainer}>
                    <View style={style.category}>
                      <View style={[style.box, {backgroundColor: colors[0]}]}></View>
                      <Text>Low Crime Rate Area</Text>
                    </View>

                    <View style={style.category}>
                      <View style={[style.box, {backgroundColor: colors[1]}]}></View>
                      <Text>Moderate Crime Rate Area</Text>
                    </View>

                    <View style={style.category}>
                      <View style={[style.box, {backgroundColor: colors[2]} ]}></View>
                      <Text>High Crime Rate Area</Text>
                    </View>

                    <View style={style.category}>
                      <View style={[style.box, {backgroundColor: colors[3]} ]}></View>
                      <Text>Verry High Crime Rate Area</Text>
                    </View>
                </View>
                <View style={style.imageContainer}>
                 <Image source={Frame} style={style.image}/>
           {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleClick(item)}
              style={item.id === 1 ? style.lowRate : style.highRate}
            />
          ))}

             
                
                </View>

              </View>
          </ScrollView>
        ): 
          <ScrollView>
          <TouchableOpacity onPress={goBack} style={{padding: 10}}>
            <ChevronLeft size={32} color="black"/>  
          </TouchableOpacity>

          <View style={style.overview}>
            <Text style={{fontWeight:500, fontSize: 18, marginBottom: 5}}>Area Overview</Text>

            <Text><Text style={{fontWeight:500}}>Total Cases: </Text>{selectedItem ? selectedItem.totalCase: "no selected item"}</Text>
            <Text><Text style={{fontWeight:500}}>Crime Rate Category: </Text>{selectedItem && selectedItem.crimeRate}</Text>
            <Text><Text style={{fontWeight:500}}>Last Updated:  </Text>{selectedItem && selectedItem.lastUpated }</Text>
            <Text><Text style={{fontWeight:500}}>Cases Solved: </Text>{selectedItem && selectedItem.caseSolved}</Text>
            <Text><Text style={{fontWeight:500}}>Peak Crime Time: </Text>{selectedItem && selectedItem.peakCrime}</Text>

          </View>
          <Text style={{fontSize: 18, fontWeight: 500, marginTop: 10, paddingLeft: 10}}>Crime Trend:</Text>
          <View style={{ height: 250, flexDirection: 'row', padding: 20 }}>
          
            {/* Y Axis (percent) */}
            <YAxis
              data={selectedItem && selectedItem.data}
              contentInset={{ top: 20, bottom: 20 }}
              svg={{ fontSize: 12, fill: 'black' }}
              numberOfTicks={6}
              formatLabel={(value) => `${value}%`}
            />

            {/* Line Graph */}
            <View style={{ flex: 1, marginLeft: 10 }}>
              <LineChart
                style={{ flex: 1 }}
                data={selectedItem && selectedItem.data}
                svg={{ stroke: 'rgb(26,46,53)', strokeWidth: 2 }}
                contentInset={{ top: 20, bottom: 20 }}
              >
                <Grid />
              </LineChart>

              {/* X Axis (days) */}
              <XAxis
                style={{ marginTop: 10 }}
                data={selectedItem && selectedItem.data}
                formatLabel={(value, index) => labels[index]}
                contentInset={{ left: 20, right: 20 }}
                svg={{ fontSize: 12, fill: 'black' }}
              />
            </View>
          </View>
          <View style={{alignItems: 'center', marginBottom: 200}}>
          <Image source={Frame2} style={{width: 340, height:300, borderRadius: 10}}/>
          </View>
          </ScrollView>
          
        }
      </View>
  );
}


const style = StyleSheet.create({
    container: {
      flex: 1, 
      padding: 10
    },
    title: {
      fontSize: 28,
      fontWeight: 500,
      marginTop: 40,
      marginLeft: 20,
      textTransform: 'uppercase',

    },
    categoryContainer: {
      flex: 2,
      alignItems: 'flex-start',
      marginTop: 10
    },
    category: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginTop: 5, 
      marginLeft: 20,
    },
     box: {
       width: 18,
       height: 15,
       position: 'relative',
       top:3
     },
     imageContainer:{
       marginTop: 30,
       justifyContent: 'center',
       alignItems: 'center'
     },
     image: {
       width: 340,
       height: 300,
       borderRadius: 10
     },
    overview: {
      alignItems: 'flex-start',
      padding: 30,
    },
  lowRate:{
    backgroundColor: "#fbff00",
    width: 16,
    height: 16,
    borderRadius: 30,
    position: "absulote",
    bottom: 70,
    left: 42
  },
  highRate: {
    backgroundColor: "#d32727",
    width: 16,
    height: 16,
    borderRadius: 30,
    position: "absulote",
    bottom: 70,
    left: 19

  }

})