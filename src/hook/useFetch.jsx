import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const req = await fetch(url);
        if (!req.ok) throw new Error(req.statusText);

        const result = await req.json();

      
        if (Array.isArray(result)) {
          setData(result);
        } else if (Array.isArray(result.data)) {
          setData(result.data);
        } else {
          setData([]); 
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
}
