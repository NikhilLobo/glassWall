import { useState, useEffect } from "react";
import { API_KEY, API_URL } from "../api/config";

const useFetch = (uploadNumber) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  useEffect(() => {
    if (uploadNumber > 0) {
      setIsLoading(true);
      fetch(`${API_URL}/images?limit=${uploadNumber}`, {
        headers: {
          "x-api-key": API_KEY,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);

          setData(data);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error);
        });
    }
  }, [uploadNumber]);

  return { data, isLoading, error };
};

export default useFetch;
