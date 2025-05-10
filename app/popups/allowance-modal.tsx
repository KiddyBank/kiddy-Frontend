import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/allowance-modal.styles';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  onRemove: () => void;
  allowanceAmount: string;
  setAllowanceAmount: (val: string) => void;
  allowanceInterval: 'monthly' | 'weekly' | 'test';
  setAllowanceInterval: (val: 'monthly' | 'weekly' | 'test') => void;
  kidName?: string;
};

const intervalOptions = [
  { label: 'חודשי', value: 'monthly' },
  { label: 'שבועי', value: 'weekly' },
  { label: 'בדיקה', value: 'test' },
];

export default function AllowanceModal({
  visible,
  onClose,
  onSave,
  onRemove,
  allowanceAmount,
  setAllowanceAmount,
  allowanceInterval,
  setAllowanceInterval,
  kidName,
}: Props) {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeIcon}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>הגדרת דמי כיס עבור {kidName}</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="סכום דמי כיס"
                value={allowanceAmount}
                onChangeText={setAllowanceAmount}
            />
            <View style={styles.intervalRow}>
                {intervalOptions.map((opt) => {
                    const selected = allowanceInterval === opt.value;
                    return (
                    <TouchableOpacity
                        key={opt.value}
                        style={[
                        styles.radioOption,
                        selected && styles.radioOptionSelected,
                        ]}
                        onPress={() => setAllowanceInterval(opt.value as any)}
                    >
                        <Text style={selected ? styles.radioTextSelected : styles.radioText}>
                        {opt.label}
                        </Text>
                    </TouchableOpacity>
                    );
                })}
            </View>
            <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>שמור</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>בטל דמי כיס</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
