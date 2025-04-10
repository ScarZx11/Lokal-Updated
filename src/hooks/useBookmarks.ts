import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = 'bookmarked_jobs';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const stored = await AsyncStorage.getItem(BOOKMARKS_KEY);
        setBookmarks(stored ? JSON.parse(stored) : []);
      } catch (error) {
        console.error('Error loading bookmarks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBookmarks();
  }, []);

  const toggleBookmark = async (job: any) => {
    try {
      let updatedBookmarks;
      if (bookmarks.some(b => b.id === job.id)) {
        updatedBookmarks = bookmarks.filter(b => b.id !== job.id);
      } else {
        updatedBookmarks = [...bookmarks, job];
      }
      
      setBookmarks(updatedBookmarks);
      await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
  };

  const isBookmarked = (jobId: string) => {
    return bookmarks.some(b => b.id === jobId);
  };

  return { bookmarks, loading, toggleBookmark, isBookmarked };
};