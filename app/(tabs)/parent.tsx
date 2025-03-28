import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

type PaymentRequest = {
  transaction_id: string;
  description: string;
  amount: number;
  status: 'PENDING_PARENT_APPROVAL';
};

export default function ParentScreen() {
  const router = useRouter();
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([]);
  const [error, setError] = useState('');

  const parentId = 'd1e5c471-d6a4-44f1-841a-a5aabef21128';


  const fetchPaymentRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/parents/${parentId}/children-playment-requests`);
      setPaymentRequests(response.data);
    } catch (error) {
      console.error('❌ שגיאה בשליפת בקשות של ילדים', error);
      setError('שגיאה בשליפת בקשות של ילדים');
    }
  };

  const approvePaymentRequest = async (transactionId: string) => {
    try {
      await axios.post(`parents/${parentId}/accept-payment-request`, { body: transactionId });
      setPaymentRequests(prev => prev.filter(request => request.transaction_id !== transactionId));
    } catch (error) {
      console.error("❌ Error approving payment request", error);
    }
  };

  useEffect(() => {
    fetchPaymentRequests();
  }, []);

  const toChild = () => {
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>יתרות הילדים</Text>
      </View>
      <View style={styles.kidsContainer}>
        <View style={styles.kid}>
          <TouchableHighlight onPress={() => toChild()}>
            <Image style={styles.image} source={{ uri: "https://www.lumosia.com/wp-content/uploads/2024/01/Child-Actor-Headshots-and-model-portfolios-139-768x1151.jpg" }} />
          </TouchableHighlight>
          <View style={styles.kidDetails}>
            <Text style={styles.kidBalance}>1000</Text>
            <Text style={styles.kidName}>Liron's Balance</Text>
          </View>
        </View>

        <View style={styles.kid}>
          <TouchableHighlight onPress={() => toChild()}>
            <Image style={styles.image} source={{ uri: "https://pauladeegan.co.uk/wp-content/uploads/2022/03/what-to-wear-for-kids-acting-headshots-banner.jpg" }} />
          </TouchableHighlight>
          <View style={styles.kidDetails}>
            <Text style={styles.kidBalance}>500</Text>
            <Text style={styles.kidName}>Emma's Balance</Text>
          </View>
        </View>

        <View style={styles.kid}>
          <TouchableHighlight onPress={() => toChild()}>
            <Image style={styles.image} source={{ uri: "https://images.squarespace-cdn.com/content/v1/6204821bfe06b76898b431c5/1679513348194-TS0BIMV5Z21XXU1T6H4N/AW5A4201.jpg" }} />
          </TouchableHighlight>
          <View style={styles.kidDetails}>
            <Text style={styles.kidBalance}>500</Text>
            <Text style={styles.kidName}>George's Balance</Text>
          </View>
        </View>
      </View>
      <View style={styles.nfcContainer}>
        <Text style={styles.sectionTitle}>בקשות תשלום ממתינות לאישור</Text>
        {error !== '' && <Text style={{ color: 'red' }}>{error}</Text>}
        <FlatList
          data={paymentRequests}
          keyExtractor={(item) => item.transaction_id}
          renderItem={({ item }) => (
            <View style={styles.transactionRow}>
              <Text style={styles.transactionText}>{item.description}</Text>
              <Text style={styles.transactionAmount}>{item.amount} ₪</Text>
              <TouchableOpacity
                style={[styles.toggleButton, styles.pending]}
                onPress={() => approvePaymentRequest(item.transaction_id)}
              >
                <Text style={styles.toggleButtonText}>אשר</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#3F51B5',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  kidsContainer: {
    width: '100%',
  },
  kid: {
    display: 'flex',
    flexDirection: 'row-reverse',
    flex: 1,
    gap: 30,
    margin: 20,
  },
  kidDetails: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  kidBalance: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#3F51B5',
  },
  kidName: {
    fontWeight: 'bold',
    color: '#3F51B5',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  nfcContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F51B5',
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  transactionText: {
    fontSize: 16,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3F51B5',
  },
  toggleButton: {
    padding: 10,
    borderRadius: 5,
  },
  pending: {
    backgroundColor: 'orange',
  },
  toggleButtonText: {
    color: 'white',
  },
});
