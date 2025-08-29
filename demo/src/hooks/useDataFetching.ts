import { useCallback, useState } from "react";

const useDataFetching = () => {
  const TLIMIT = 200;
  const SEGMENT_SIZE = 15;

  const [data, setData] = useState<DataT[]>([]);

  const [hasNext, setHasNext] = useState<boolean>(true);

  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const updateData = () => {
    setData((prev) => {
      const arr = [...prev];
      for (let i = 0; i < SEGMENT_SIZE; i++) {
        const id = arr.length;
        arr.push({ id, title: `Item ${id}`, price: Math.random().toFixed(2) });
      }
      setHasNext(arr.length < TLIMIT);
      return arr;
    });
  };

  const fetchData = useCallback(async () => {
    if (!hasNext) return;

    try {
      setError(null);
      setLoading(true);
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(updateData());
        }, 1000);
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [hasNext]);

  return { fetchData, data, error, loading, hasNext };
};

export default useDataFetching;
