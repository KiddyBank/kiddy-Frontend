import axios from 'axios';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

interface Child {
  username: string;
  email: string;
  dateOfBirth: string;
  gender: Gender;
  avatar_path?: string;
}

interface ParentForm {
  username: string;
  lastName: string; 
  email: string;
  password: string;
  dateOfBirth: string;
  gender: Gender;
  avatar_path?: string;
}

export default function ParentSignup() {
  const router = useRouter();
  const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP;
  const LOCAL_PORT = Constants.expoConfig?.extra?.LOCAL_PORT;

  const [parentForm, setParentForm] = useState<ParentForm>({
    username: '',
    lastName: '', 
    email: '',
    password: '',
    dateOfBirth: '',
    gender: Gender.OTHER,
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [childDatePickers, setChildDatePickers] = useState<boolean[]>([]);

  const [children, setChildren] = useState<Child[]>([
    { username: '', email: '', dateOfBirth: '', gender: Gender.OTHER },
  ]);

  const handleParentChange = (field: keyof ParentForm, value: string) => {
    if (field === 'gender') {
      const genderValue = value as Gender;

      const avatar_path =
        genderValue === Gender.FEMALE
          ? '/avatars/avatar-mom.png'
          : genderValue === Gender.MALE
          ? '/avatars/avatar-dad.png'
          : undefined;

      setParentForm(prev => ({
        ...prev,
        gender: genderValue,
        avatar_path, 
      }));
    } else {
      setParentForm(prev => ({ ...prev, [field]: value }));
    }
  };


  const handleDateChange = (_event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      const formatted = date.toISOString().split('T')[0];
      handleParentChange('dateOfBirth', formatted);
    }
  };

  const handleChildDateChange = (index: number, _event: any, date?: Date) => {
    const updatedChildren = [...children];
    setChildDatePickers(prev => prev.map((_, i) => i === index ? false : _));
    if (date) {
      updatedChildren[index].dateOfBirth = date.toISOString().split('T')[0];
      setChildren(updatedChildren);
    }
  };

  const handleChildChange = (index: number, field: keyof Child, value: string) => {
    const updated = [...children];

    if (field === 'gender') {
      updated[index].gender = value as Gender;

      updated[index].avatar_path =
        value === Gender.FEMALE
          ? '/avatars/avatar-girl.png'
          : value === Gender.MALE
          ? '/avatars/avatar-boy.png'
          : undefined;
    } else {
      updated[index][field] = value;
    }
    setChildren(updated);
  };


  const addChild = () => {
    setChildren([...children, { username: '', email: '', dateOfBirth: '', gender: Gender.OTHER }]);
    setChildDatePickers([...childDatePickers, false]);
  };

  const removeChild = (index: number) => {
    const updated = children.filter((_, i) => i !== index);
    setChildren(updated);
    setChildDatePickers(childDatePickers.filter((_, i) => i !== index));
  };

  const handleRegister = async () => {
    try {
      const payload = {
        ...parentForm,
        children
      };
      await axios.post(`http://${LOCAL_IP}:${LOCAL_PORT}/auth/register-parent`, payload);
      alert('ההרשמה בוצעה בהצלחה! כעת ניתן להתחבר.');
      router.replace('/login-dialog');
    } catch (err) {
      console.error(err);
      alert('ההרשמה נכשלה');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← חזרה להתחברות</Text>
      </TouchableOpacity>

      <Text style={styles.title}>הרשמה כהורה</Text>

      <TextInput placeholder="שם פרטי" onChangeText={(v) => handleParentChange('username', v)} style={styles.input} />
      <TextInput placeholder="שם משפחה" onChangeText={(v) => handleParentChange('lastName', v)} style={styles.input} />
      <TextInput placeholder="אימייל" onChangeText={(v) => handleParentChange('email', v)} style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="סיסמה" secureTextEntry onChangeText={(v) => handleParentChange('password', v)} style={styles.input} />

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text style={{ color: selectedDate ? '#000' : '#999' }}>
          {selectedDate ? selectedDate.toLocaleDateString('he-IL') : 'תאריך לידה'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          locale="he"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.subtitle}>מגדר</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={parentForm.gender} onValueChange={(value) => handleParentChange('gender', value)}>
          <Picker.Item label="בחר מגדר" value={Gender.OTHER} />
          <Picker.Item label="זכר" value={Gender.MALE} />
          <Picker.Item label="נקבה" value={Gender.FEMALE} />
          <Picker.Item label="אחר" value={Gender.OTHER} />
        </Picker>
      </View>

      <Text style={styles.subtitle}>פרטי הילדים</Text>
      {children.map((child, index) => (
        <View key={index} style={styles.childSection}>
          <TextInput placeholder={`שם ילד ${index + 1}`} value={child.username} onChangeText={(v) => handleChildChange(index, 'username', v)} style={styles.input} />
          <TextInput placeholder="אימייל של הילד" value={child.email} onChangeText={(v) => handleChildChange(index, 'email', v)} style={styles.input} keyboardType="email-address" />
          
          <TouchableOpacity onPress={() => {
            const updated = [...childDatePickers];
            updated[index] = true;
            setChildDatePickers(updated);
          }} style={styles.input}>
            <Text style={{ color: child.dateOfBirth ? '#000' : '#999' }}>
              {child.dateOfBirth ? new Date(child.dateOfBirth).toLocaleDateString('he-IL') : 'תאריך לידה של הילד'}
            </Text>
          </TouchableOpacity>

          {childDatePickers[index] && (
            <DateTimePicker
              value={child.dateOfBirth ? new Date(child.dateOfBirth) : new Date()}
              mode="date"
              display="default"
              locale="he"
              onChange={(event, date) => handleChildDateChange(index, event, date)}
            />
          )}

          <Text style={styles.childLabel}>מגדר הילד</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={child.gender} onValueChange={(value) => handleChildChange(index, 'gender', value)}>
              <Picker.Item label="בחר מגדר" value={Gender.OTHER} />
              <Picker.Item label="זכר" value={Gender.MALE} />
              <Picker.Item label="נקבה" value={Gender.FEMALE} />
              <Picker.Item label="אחר" value={Gender.OTHER} />
            </Picker>
          </View>

          {children.length > 1 && (
            <TouchableOpacity onPress={() => removeChild(index)}>
              <Text style={styles.removeChild}>הסר ילד</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <Button title="הוסף ילד נוסף" onPress={addChild} />

      <View style={{ marginTop: 20 }}>
        <Button title="הרשמה" onPress={handleRegister} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 60 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  subtitle: { fontSize: 18, marginVertical: 15, textAlign: 'right' },
  input: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'right',
    writingDirection: 'rtl', 
  },
  childSection: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 15,
  },
  removeChild: {
    color: 'red',
    textAlign: 'right',
    marginBottom: 10,
  },
  backButton: {
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  backText: {
    color: '#007AFF',
    fontSize: 16,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  childLabel: {
    textAlign: 'right',
    marginBottom: 4,
    fontWeight: '500',
  },
});
