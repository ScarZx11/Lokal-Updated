import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const EmptyState = ({ message = 'No jobs found' }) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="search-off" size={48} color="#94a3b8" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 16,
  },
});

export default EmptyState;