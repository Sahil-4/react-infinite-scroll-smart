import { useCallback, useState } from "react";

const useDataFetching = () => {
  const [data, setData] = useState<DataT[]>([]);

  const [page, setPage] = useState<number>(1);
  const [hasNext, setHasNext] = useState<boolean>(true);

  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const updateData = useCallback(async () => {
    const BASE_URI = `https://api.freeapi.app`;
    const URI_PATH = `/api/v1/public/randomproducts`;
    const LIMIT = 10;
    const queryParams = `?page=${page}&limit=${LIMIT}`;
    const response = await fetch(`${BASE_URI}${URI_PATH}${queryParams}`);
    if (!response.ok) throw new Error("Network error");

    const json = await response.json();
    const arr: DataT[] = json.data.data.map((item: any) => ({ ...item }));
    console.log(arr);

    setHasNext(json.data.nextPage);
    setPage((prev) => prev + 1);
    setData((prev) => [...prev, ...arr]);
  }, [page]);

  const fetchData = useCallback(async () => {
    if (!hasNext) return;

    try {
      setError(null);
      setLoading(true);
      await updateData();
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [hasNext, updateData]);

  return { fetchData, data, error, loading, hasNext };
};

export default useDataFetching;
