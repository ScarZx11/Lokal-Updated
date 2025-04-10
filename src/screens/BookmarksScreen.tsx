import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useBookmarks } from '../hooks/useBookmarks';
import JobCard from '../components/JobCard';
import LoadingIndicator from '../components/LoadingIndicator';
import EmptyState from '../components/EmptyState';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Job } from '../types';

type BookmarksScreenProps = NativeStackScreenProps<RootStackParamList, 'Bookmarks'>;

const BookmarksScreen: React.FC<BookmarksScreenProps> = ({ navigation }) => {
  const { bookmarks, loading, toggleBookmark, isBookmarked } = useBookmarks();

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

  if (loading) return <LoadingIndicator />;
  if (bookmarks.length === 0) return <EmptyState message="No bookmarks yet" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
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

export default BookmarksScreen;