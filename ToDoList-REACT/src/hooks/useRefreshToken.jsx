import axios from "../api/axios";
import useLoged from "./useAuth";

const useRefreshToken = () => {
  const { setLoged } = useLoged();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setLoged((prev) => {
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
