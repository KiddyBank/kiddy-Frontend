import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import { styles } from '../styles/savings-form-modal.styles';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    category: string;
    targetAmount: number;
    initialAmount: number;
  }) => void;
  availableBalance: number; 
};

const SavingsFormPopup: React.FC<Props> = ({
  visible,
  onClose,
  onSubmit,
  availableBalance,
}) => {
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [targetAmount, setTargetAmount] = React.useState('');
  const [initialAmount, setInitialAmount] = React.useState('');
  const [error, setError] = React.useState('');
  const isDisabled =
  !name ||
  !targetAmount ||
  +initialAmount > availableBalance ||
  +initialAmount > +targetAmount;



  const handleSubmit = () => {
    const initial = +initialAmount;
    const target = +targetAmount;

    if (!name || !category || !targetAmount) return;

    if (initial > availableBalance) {
      setError('אין לך מספיק יתרה 😅');
      return;
    }

    onSubmit({
      name,
      category,
      targetAmount: target,
      initialAmount: initial,
    });

    setName('');
    setCategory('');
    setTargetAmount('');
    setInitialAmount('');
    setError('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView>
            <Image source={require('../../assets/images/goal.png')} style={styles.image} />
            <Text style={styles.title}>נגדיר מטרה חדשה!</Text>

            <Text style={styles.label}>איך נקרא לחיסכון?</Text>
            <TextInput
              style={styles.input}
              placeholder="לדוגמה: פלייסטיישן 5"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>כמה כסף צריך כדי להגשים?</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="סכום יעד"
              value={targetAmount}
              onChangeText={setTargetAmount}
            />

            <Text style={styles.label}>
              רוצה לשים משהו כבר עכשיו?  (יש לך {availableBalance.toLocaleString('he-IL')}₪)
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="סכום ראשוני"
              value={initialAmount}
              onChangeText={(text) => {
                setInitialAmount(text);
                const numeric = +text;
                if (numeric > availableBalance) {
                  setError('הסכום הראשוני גדול מהיתרה שלך 😅');
                } else if (numeric > +targetAmount) {
                  setError('הסכום הראשוני גדול מסכום היעד 🎯');
                } else {
                  setError('');
                }
              }}
            />
            {error !== '' && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity
              style={[styles.submitButton, isDisabled && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={isDisabled}
            >
              <Text style={styles.submitButtonText}>יאללה, נתחיל! 🚀</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>ביטול</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default SavingsFormPopup;
