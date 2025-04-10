import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onPress: (job: Job) => void;
  isBookmarked: boolean;
  onBookmarkPress: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onPress, isBookmarked, onBookmarkPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(job)}>
      <View style={styles.header}>
        <Text style={styles.title}>{job.title}</Text>
        <TouchableOpacity onPress={() => onBookmarkPress(job)}>
          <MaterialIcons 
            name={isBookmarked ? 'bookmark' : 'bookmark-border'} 
            size={24} 
            color={isBookmarked ? '#3b82f6' : '#64748b'} 
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.location}>{job.location}</Text>
      <Text style={styles.salary}>Salary: {job.salary}</Text>
      <Text style={styles.phone}>Contact: {job.phone}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
  },
  location: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  salary: {
    fontSize: 14,
    color: '#16a34a',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: '#3b82f6',
  },
});

export default JobCard;