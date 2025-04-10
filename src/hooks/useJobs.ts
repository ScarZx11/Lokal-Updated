// import { useState, useEffect, useCallback } from 'react';
// import { fetchJobs } from '../utils/api';

// export const useJobs = () => {
//   const [jobs, setJobs] = useState<any[]>([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [hasMore, setHasMore] = useState(true);

//   const loadJobs = useCallback(async () => {
//     if (!hasMore || loading) return;
    
//     setLoading(true);
//     setError(null);
    
//     try {
//       const data = await fetchJobs(page);
//       setJobs(prev => [...prev, ...data]);
//       setHasMore(data.length > 0);
//       setPage(prev => prev + 1);
//     } catch (err) {
//       setError('Failed to fetch jobs');
//     } finally {
//       setLoading(false);
//     }
//   }, [page, hasMore, loading]);

//   useEffect(() => {
//     loadJobs();
//   }, []);

//   return { jobs, loading, error, hasMore, loadMore: loadJobs };
// };


import { useState, useEffect, useCallback } from 'react';
import { fetchJobs } from '../utils/api';

export const useJobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const loadJobs = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetchJobs(page);

      // Safely extract data
      const data = Array.isArray(response)
        ? response
        : Array.isArray(response?.jobs)
        ? response.jobs
        : [];

      setJobs(prev => [...prev, ...data]);
      setHasMore(data.length > 0);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  useEffect(() => {
    loadJobs();
  }, []);

  return { jobs, loading, error, hasMore, loadMore: loadJobs };
};
