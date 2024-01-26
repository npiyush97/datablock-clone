import Papa from 'papaparse';
import { useState } from 'react';

const useCSVData = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const readCSVData = async (fileName: string) => {
    setLoading(true);

    try {
      const response = await fetch(`/csvs/${fileName}`);
      if (!response.ok) {
        throw new Error('Failed to read csv file');
      }

      const data = await response.text();

      // my logic
      const logicRes = new Promise((resolve, reject) => {
        Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setLoading(false);
            resolve(result.data);
          },
          error: (error: Error) => {
            setLoading(false);
            console.error(error);
            reject(error);
          }
        });
      });

      setLoading(false);
      return logicRes;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { loading, readCSVData };
};

export default useCSVData;
