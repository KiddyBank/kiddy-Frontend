import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3F51B5',
    marginBottom: 10,
    textAlign: 'center',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    alignSelf: 'flex-end',
    writingDirection: 'rtl',
  },

  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },

  depositText: {
    fontSize: 16,
    color: '#333',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },

  emptyImage: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },

  emptySubTitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },

  letsGoButton: {
    backgroundColor: '#3F51B5',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 2,
  },

  letsGoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
  backgroundColor: 'white',
  borderRadius: 12,
  padding: 16,
  marginBottom: 20,
  elevation: 2,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
},
emptySection: {
  padding: 20,
  alignItems: 'center',
  justifyContent: 'center',
},

header: {
  backgroundColor: '#3F51B5',
  alignItems: 'center',
  padding: 10,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  width: '100%',
  marginBottom: 10,
},

goalName: {
  fontSize: 28,
  color: 'white',
  fontWeight: 'bold',
  marginBottom: 6,
  marginTop: 10,

},

profileImage: {
  width: 80,
  height: 80,
  borderRadius: 40,
},

goalProgress: {
  fontSize: 22,
  color: 'white',
  fontWeight: 'bold',
  marginBottom: 6,

},

  scrollContent: {
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  
  graphCard: {
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  padding: 20,
  marginBottom: 24,
  alignItems: 'center',
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  justifyContent: 'center',
},


customLegendContainer: {
  marginTop: 16,
  width: '100%',
  alignItems: 'flex-end', 
  gap: 8,
},

legendRow: {
  flexDirection: 'row-reverse',
  alignItems: 'center',
  marginBottom: 6,
},

legendDot: {
  width: 12,
  height: 12,
  borderRadius: 6,
  marginLeft: 8,
},

legendLabel: {
  fontSize: 14,
  color: '#333',
},

graphWrapper: {
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  paddingVertical: 10,
},

depositCard: {
  backgroundColor: 'white',
  borderRadius: 12,
  padding: 16,
  marginBottom: 12,
  elevation: 2,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
},

depositRow: {
  flexDirection: 'row-reverse',
  alignItems: 'center',
  marginBottom: 6,
},

depositIcon: {
  fontSize: 16,
  marginLeft: 6,
},

depositLabel: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#333',
  marginLeft: 6,
},

depositValue: {
  fontSize: 14,
  color: '#333',
  flexShrink: 1,
},

encouragementContainer: {
  backgroundColor: '#E5F9F2',
  borderRadius: 16,
  padding: 16,
  marginVertical: 20,
  alignItems: 'center',
  justifyContent: 'center',
},

savingsEncouragement: {
  fontSize: 16,
  color: '#1B4D3E',
  textAlign: 'center',
  marginBottom: 12,
  fontWeight: '500',
},

encourageButton: {
  backgroundColor: '#00C897',
  paddingVertical: 10,
  paddingHorizontal: 24,
  borderRadius: 20,
},

encourageButtonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},



});
