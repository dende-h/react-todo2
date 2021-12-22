import { useCallback, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const login = useCallback(async (id) => {
    setLoading(true);
    await axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        if (res.data) {
          navigate("/home");
          toast.success("ログインしました");
        }
      })
      .catch(() => toast.error("ログインできません"))
      .finally(() => setLoading(false));
  }, []);
  return { loading, login };
};
