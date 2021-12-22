import { useCallback, useState } from "react";
import axios from "axios";

import toast from "react-hot-toast";

export const useFetchUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    setLoading(true);
    await axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => setUsers(res.data))
      .catch(() => toast.error("ユーザーが取得できません"))
      .finally(() => setLoading(false));
  }, []);
  return { getUsers, loading, users };
};
