import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { styles } from '../styles/task-modal.styles'; 


export interface TaskForm {
  name: string;
  description?: string;
  payment_amount: string;
  monthly_limit: string;
  child_ids: string[];
}

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (task: TaskForm) => void;
  childrenList: { name: string; id: string }[];
}

export default function TaskModal({ visible, onClose, onSave, childrenList }: TaskModalProps) {
  const [form, setForm] = useState<TaskForm>({
    name: '',
    description: '',
    payment_amount: '',
    monthly_limit: '',
    child_ids: [],
  });

  useEffect(() => {
    if (visible) {
      setForm({
        name: '',
        description: '',
        payment_amount: '',
        monthly_limit: '',
        child_ids: [],
      });
    }
  }, [visible]);


  const toggleChild = (id: string) => {
    setForm((prev) => ({
      ...prev,
      child_ids: prev.child_ids.includes(id)
        ? prev.child_ids.filter((c) => c !== id)
        : [...prev.child_ids, id],
    }));
  };

  

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView>
            <Text style={styles.title}>הוספת מטלה</Text>

            <TextInput
              placeholder="שם המטלה"
              value={form.name}
              onChangeText={(v) => setForm({ ...form, name: v })}
              style={styles.input}
            />

            <TextInput
              placeholder="תיאור"
              value={form.description}
              onChangeText={(v) => setForm({ ...form, description: v })}
              style={styles.input}
            />

            <TextInput
              placeholder="סכום תגמול"
              keyboardType="numeric"
              value={form.payment_amount}
              onChangeText={(v) => setForm({ ...form, payment_amount: v })}
              style={styles.input}
            />

            <TextInput
              placeholder="הגבלה חודשית"
              keyboardType="numeric"
              value={form.monthly_limit}
              onChangeText={(v) => setForm({ ...form, monthly_limit: v })}
              style={styles.input}
            />

            <Text style={styles.subtitle}>בחר ילדים</Text>
            {childrenList.map((child) => (
              <TouchableOpacity
                key={child.id}
                onPress={() => toggleChild(child.id)}
                style={form.child_ids.includes(child.id) ? styles.selected : styles.unselected}
              >
                <Text>{child.name}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.buttonsRow}>
              <Button title="ביטול" onPress={onClose} color="#aaa" />
              <Button
                title="שמור"
                onPress={() => {
                  if (!form.name || !form.payment_amount || !form.monthly_limit || form.child_ids.length === 0) {
                    alert('יש למלא את כל השדות ולבחור לפחות ילד אחד');
                    return;
                  }
                  onSave(form);
                }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
