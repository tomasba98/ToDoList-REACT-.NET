import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = async (method, url, fields) => {
    try {
      setLoading(true);

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };

      const response = await axios({
        method,
        url,
        data: fields,
        headers,
      });

      setLoading(false);
      return response.data; // assuming you always expect data
    } catch (error) {
      console.error("Error in the API request:", error);
      toast.error(`Error: ${error?.response?.data?.error || "Unknown error"}`);
      setLoading(false);
      setError(error?.response?.data?.error);
      throw error; // rethrow the error for better debugging
    }
  };

  return { sendRequest, loading, error };
};

export default useApiRequest;
