import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useBookmarks } from '../hooks/useBookmarks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type JobDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'JobDetails'>;

const JobDetailsScreen: React.FC<JobDetailsScreenProps> = ({ route }) => {
  const { job } = route.params;
  const { isBookmarked, toggleBookmark } = useBookmarks();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{job.title}</Text>
        <MaterialIcons 
          name={isBookmarked(job.id) ? 'bookmark' : 'bookmark-border'} 
          size={28} 
          color={isBookmarked(job.id) ? '#3b82f6' : '#64748b'} 
          onPress={() => toggleBookmark(job)}
        />
      </View>
      
      <View style={styles.detailRow}>
        <MaterialIcons name="location-on" size={20} color="#64748b" />
        <Text style={styles.detailText}>{job.location}</Text>
      </View>
      
      <View style={styles.detailRow}>
        <MaterialIcons name="attach-money" size={20} color="#16a34a" />
        <Text style={styles.detailText}>{job.salary}</Text>
      </View>
      
      <View style={styles.detailRow}>
        <MaterialIcons name="phone" size={20} color="#3b82f6" />
        <Text style={styles.detailText}>{job.phone}</Text>
      </View>
      
      {job.description && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Description</Text>
          <Text style={styles.description}>{job.description}</Text>
        </View>
      )}
      
      {job.requirements && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          <Text style={styles.description}>{job.requirements}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#334155',
    marginLeft: 10,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
  },
});

export default JobDetailsScreen;