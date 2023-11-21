import {useState, useCallback, useRef} from 'react';

const useFetch = <T, P = void>(fetchFunction: (params: P) => Promise<T>) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const initialParams = useRef<P | undefined>(undefined);
  const lastParams = useRef<P | undefined>(undefined);

  const fetch = useCallback(
    async (params: P) => {
      try {
        const response = await fetchFunction(params);
        if (response) {
          setData(response);
          setError(false);
          if (initialParams.current === undefined) {
            initialParams.current = params;
          }
        }
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
        setRefreshing(false);
        lastParams.current = params;
      }
    },
    [fetchFunction],
  );

  const refresh = () => {
    setRefreshing(true);
    if (initialParams.current !== undefined) {
      fetch(initialParams.current as P);
    }
  };

  const retry = () => {
    setLoading(true);
    fetch(lastParams.current as P);
  };

  return {
    loading,
    setLoading,
    refreshing,
    setRefreshing,
    error,
    setError,
    data,
    refresh,
    retry,
    fetch,
  };
};

export default useFetch;
