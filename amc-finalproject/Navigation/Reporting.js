import { useState , useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const data = {
  "Cebu": {
    "Cebu City": ["Lahug", "Mabolo", "Banilad"],
    "Mandaue": ["Tipolo", "Subangdaku"]
  },
  "Davao del Sur": {
    "Davao City": ["Buhangin", "Talomo", "Tugbok"],
    "Sta. Cruz": ["Zone I", "Zone II"]
  }
};


export default function Reporting() {
  const [showPicker, setShowPicker] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [pickerMode, setPickerMode] = useState('date');
  const [incidentType, setIncidentType] = useState('');
  const [reportNumber, setReportNumber] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [reporterContact, setReporterContact] = useState('');
  const [reporterDescription, setReporterDescription] = useState('')
  const [reporterIncident, setReporterIncident] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const [province, setProvince] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [barangay, setBarangay] = useState('');
  const [finalLocation, setFinalLocation] = useState('');

  const provinces = Object.keys(data);
  const municipalities = province ? Object.keys(data[province]) : [];
  const barangays = municipality ? data[province][municipality] : [];

  const updateLocation = (p, m, b) => {
    if (p && m && b) {
      setFinalLocation(`${p}, ${m}, ${b}`);
    }
  };
  const allowedIncidentTypes = ['Theft', 'Assault', 'Burglary', 'Vandalism'];

  const showDateTimePicker = () => {
    setPickerMode('date');
    setShowPicker(true);
  };

  const onChange = (event, selected) => {
    const current = selected || dateTime;
    if (pickerMode === 'date') {
      setDateTime(current);
      if (Platform.OS === 'android') {
        setPickerMode('time');
        setShowPicker(true);
      }
    } else {
      setDateTime(current);
      setShowPicker(false);
    }
  };

const formatDateTime = (dt) => {
  if (!(dt instanceof Date) || isNaN(dt)) {
    return "Invalid Date"; 
  }
  return Platform.OS === 'ios'
    ? dt.toLocaleString()
    : `${dt.toISOString().slice(0, 10)} ${dt.toTimeString().slice(0, 5)}`;
};

useEffect(() => {
  if (province && municipality && barangay) {
    setFinalLocation(`${barangay}, ${municipality}, ${province}`);
  }
}, [province, municipality, barangay]);
 

const sanitizeReportNumber = (value) => value.replace(/[^0-9]/g, '').slice(0, 12);
const sanitizeName = (value) => value.replace(/[^a-zA-Z\s-]/g, '')
const sanitizeContact = (value) => value.replace(/[^0-9]/g, '').slice(0, 12);
const sanitizeDescription = (value) => value.replace(/[^\w\s.,'"!-]/g, '')
const sanitizeIncidentType = (value) => value.trim(); 

const resetForm = () => {
  setReportNumber('');
  setIncidentType('');
  setDateTime(new Date()); 
  setFinalLocation('')
  setReporterName('');
  setReporterContact('');
  setReporterDescription('');
  setReporterIncident('');
};

const handleSubmit = () => {
   if (
    !reportNumber ||
    !incidentType ||
    !dateTime ||
    !finalLocation ||
    !reporterName ||
    !reporterContact ||
    !reporterDescription ||
    !reporterIncident
  ) {
    Alert.alert('Incomplete Form', 'Please fill in all fields before submitting.');
    return;
  }
       // Report Number if not 12 input number 
     if (reportNumber.length !== 12) {
         Alert.alert(
            'Invalid Report Number',
            'Report number must be exactly 12 digits long.'
          );
          return;
        }

        // Report Date if selected future date and time invalid 
      const now = new Date();
      const selectedDate = new Date(dateTime);

      if (selectedDate.getTime() > now.getTime()) {
        Alert.alert('Invalid Date', 'Date and time cannot be in the future.');
        return;
      }

        //Report Cantact number if not start 09
      if (!reporterContact.startsWith('09')) {
      Alert.alert('Invalid Contact Number', 'The contact number must start with "09".');
      return;
    }

       //Report Contact number if not 12 input number 
    if (reporterContact.length !== 11 ) {   
      Alert.alert(
        'Invalid Contact Number ',
        'Contact number must be exactly 11 digits long.'
        );
      return;
      }


    
  const formattedDate = formatDateTime(dateTime);

  const message = `
    Report Number: ${reportNumber}
------------------------------------------------------------

    Incident Type: ${incidentType}
------------------------------------------------------------

    Date and Time: ${formattedDate}
------------------------------------------------------------

    Location: ${finalLocation}
------------------------------------------------------------

    Reporter Name: ${reporterName}
------------------------------------------------------------

    Reporter Contact: ${reporterContact}
------------------------------------------------------------

    Suspect Description: ${reporterDescription}
------------------------------------------------------------

    Suspect Contact: ${reporterIncident}
  `;

  Alert.alert(
    'Confirm Submission',
    message,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            Alert.alert('Submitted!', 'Your report has been submitted successfully.');
            resetForm()
          }, 2000);
        },
      },
    ],
    { cancelable: false }
  );
};
  return (
    <View style={style.container}>
      <Text style={style.titleText}>Reports</Text>
      <ScrollView style={style.form} >

        <View style={style.conntiner2nd}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>REPORT NUMBER</Text>
         {/*----------------------------------------- Report Number -----------------------------------------*/}
        <View style={style.inputTextContainer}>
          <Text style={style.label}>Report Number:</Text>
          <TextInput
            value={reportNumber}
            onChangeText={(text) => setReportNumber(sanitizeReportNumber(text))}
            keyboardType="numeric"
            maxLength={12}
            style={style.inputText}
          />
        </View>

        {/*--------------------------------------------- Incident Type ----------------------------------------*/}
        <View style={style.inputTextContainer}>
          <Text style={style.label}>Incident Type:</Text>
          <View style={style.pickerContainer}>
            <Picker
              selectedValue={incidentType}
              onValueChange={(value) => setIncidentType(sanitizeIncidentType(value))}
              style={style.picker}
            >
              <Picker.Item label="Select incident type..." value="" />
              {allowedIncidentTypes.map((type) => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
            </Picker>
          </View>
        </View>

        {/*--------------------------------------------------- Date and Time ---------------------------------- */}
        <View style={style.inputTextContainer}>
          <Text style={style.label}>Date and Time:</Text>
          <TouchableOpacity
            onPress={showDateTimePicker}
            style={style.inputText}
          >
            <Text style={{
              paddingVertical: 10,
              textAlign: 'center',
              fontWeight: "bold"
            }}>
              {formatDateTime(dateTime)}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={dateTime}
              mode={pickerMode}
              display="default"
              onChange={onChange}
            />
          )}
        </View>

        {/*-------------------------------------------------------- Location ------------------------------*/}

        <View style={style.inputTextContainer}>
        <Text style={style.label}>Selected Location:</Text>
        <TextInput
          value={finalLocation}
          editable={false}
          placeholder="Province, Municipality, Barangay"
        />

        <Text>Province:</Text>
        <Picker
          selectedValue={province}
          onValueChange={(value) => {
            setProvince(value);
            setMunicipality('');
            setBarangay('');
            setFinalLocation('');
          }}
        >
          <Picker.Item label="Select Province" value="" />
          {provinces.map((prov) => (
            <Picker.Item key={prov} label={prov} value={prov} />
          ))}
        </Picker>

        <Text>Municipality:</Text>
        <Picker
          selectedValue={municipality}
          enabled={province !== ''}
          onValueChange={(value) => {
            setMunicipality(value);
            setBarangay('');
            setFinalLocation('');
          }}
        >
          <Picker.Item label="Select Municipality" value="" />
          {municipalities.map((mun) => (
            <Picker.Item key={mun} label={mun} value={mun} />
          ))}
        </Picker>

        <Text>Barangay:</Text>
        <Picker
          selectedValue={barangay}
          enabled={municipality !== ''}
          onValueChange={(value) => {
            setBarangay(value);
            updateLocation(province, municipality, value);
          }}
        >
          <Picker.Item label="Select Barangay" value="" />
          {barangays.map((brgy) => (
            <Picker.Item key={brgy} label={brgy} value={brgy} />
          ))}
        </Picker>
      </View>
    </View>


          {/*__________________REPORTING PARTY_________________*/}
          <View style={style.conntiner2nd}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>REPORTING PARTY</Text>
          {/*-------------------------------------------------------- Name ------------------------------*/}
        <View style={style.inputTextContainer}>
          <Text style={style.label}>Name:</Text>
          <TextInput
            value={reporterName}
            placeholder="Ex: Louiejie Gonzales"
            keyboardType="default"
            style={[style.inputText, { paddingVertical: 10 }]}
            onChangeText={(text) => setReporterName(sanitizeName(text))}
          />
        </View>

        {/*-------------------------------------------------------- Contact Number: ------------------------------*/}
        <View style={style.inputTextContainer}>
          <Text style={style.label}>Contact Number:</Text>
          <TextInput
            placeholder="Ex: 093892331232"
            value={reporterContact}
            keyboardType="phone-pad"
            maxLength={11}
            style={style.inputText}
            onChangeText={(text) => setReporterContact(sanitizeContact(text))}
          />
        </View>
       </View>
      

         {/*__________________SUSPECT INFORMATION_________________*/}
          <View style={style.conntiner2nd}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>SUSPECT INFORMATION</Text>
          {/*-------------------------------------------------------- Description ------------------------------*/}
        <View style={style.inputTextContainer}>
          <Text style={style.label}>Description:</Text>
          <TextInput
            value={reporterDescription}
            placeholder="Ex: Male, approx. 5'8, wearing a black hoodieEscaped on a red motorcycle heading north."
            keyboardType="default"
            multiline={true}
            numberOfLines={4}
            style={[style.inputText, { paddingVertical: 10 }]}
            onChangeText={(text) => setReporterDescription(sanitizeDescription(text))}
          />
        </View>
       </View>

           {/*_________________INCIDENT SUMMARY________________*/}
          <View style={style.conntiner2nd}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>INCIDENT SUMMARY</Text>
          {/*-------------------------------------------------------- Description ------------------------------*/}
        <View style={style.inputTextContainer}>
          <Text style={style.label}>Description:</Text>
          <TextInput
            value={reporterIncident}
            placeholder="Ex: The victim, Mr. Gonzales, was walking home when an unidentified male suspect held him at knifepoint and demanded his valuables. The suspect forcibly took the victim’s phone, wallet, and ID. CCTV footage from a nearby convenience store recorded the incident. Authorities retrieved the footage for further review."
            keyboardType="default"
            multiline={true}
            numberOfLines={12}
            style={[style.inputText, { paddingVertical: 10 }]}
            onChangeText={(text) => setReporterIncident(sanitizeDescription(text))}
          />
        </View>
       </View>
      
      <TouchableOpacity style={style.buttonSubmit} onPress={handleSubmit}>
       <Text style={{textAlign: "center", color: 'white'}}>Sumbit</Text>
      </TouchableOpacity>

      {isLoading && (
        <View style={style.loadingOverlay}>
          <View style={style.loadingCircle}>
            <ActivityIndicator size="large" color="black" />
          </View>
        </View>
      )}

      </ScrollView>
    </View>
  );
}
const { width, height } = Dimensions.get('window');

const style = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    flex: 1,
  },
  titleText: {
    fontSize: 22,
    paddingHorizontal: 10,
    color: '#0081f1',
    paddingBottom: 20,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 5,
    textAlign: 'center'
  },
  form: {
    paddingHorizontal: 10
  },
  label: {
    color: "#007DFE",
  },
  inputText: {
    outlineStyle: 'none',
    fontSize: 16,

  },
  inputTextContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 5,
    marginVertical: 5,
  },
  picker: {
    fontSize: 12,
  },
  pickerContainer: {},
  conntiner2nd: {
    justifyContent: "center",
    marginTop: 12,
    marginBottom: 30
  },
  buttonSubmit: {
    marginBottom: 30,
    backgroundColor: '#007DFE',
    padding: 10,
    borderRadius: 5
  },

loadingCircle: {
  width: 120,
  height: 120,
  borderRadius: 60,
  position: 'absolute',
  top: -350,
  left: '50%',
  transform: [{ translateX: -60 }, { translateY: -60 }],
  zIndex: 11,
},


});
