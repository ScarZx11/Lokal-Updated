import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useJobs } from '../hooks/useJobs';
import { useBookmarks } from '../hooks/useBookmarks';
import JobCard from '../components/JobCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Job } from '../types';

type JobsScreenProps = NativeStackScreenProps<RootStackParamList, 'Jobs'>;

const JobsScreen: React.FC<JobsScreenProps> = ({ navigation }) => {
  const { jobs, loading, error, hasMore, loadMore } = useJobs();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const handleJobPress = (job: Job) => {
    navigation.navigate('JobDetails', { job });
  };

  const renderItem = ({ item }: { item: Job }) => (
    <JobCard
      job={item}
      onPress={handleJobPress}
      isBookmarked={isBookmarked(item.id)}
      onBookmarkPress={toggleBookmark}
    />
  );

  const renderFooter = () => {
    if (!loading || !hasMore) return null;
    return <LoadingIndicator />;
  };

  if (error) return <ErrorMessage message={error} onRetry={loadMore} />;
  if (!loading && jobs.length === 0) return <EmptyState />;

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  list: {
    padding: 16,
  },
});

export default JobsScreen;