import { useCallback, useContext, useEffect, useState } from "react";
import axios from "./axios";
import { apis } from "./apis";
import authContext from "../context/auth-context/auth-context";
import { getLocalStorage } from "../getLocalstorage";
export const useFollowUnFollow = () => {
  const [isFollowLoading, setLoading] = useState<boolean>(false);
  const [followData, setData] = useState<any[]>();
  const [followError, setError] = useState<string>("");
  const { token } = useContext(authContext);
  const setFollow = useCallback(async (id: number) => {
    setLoading(true);
    let response = await axios
      .get(apis.follow(id), {
        headers: { Authorization: `Bearer ${getLocalStorage()?getLocalStorage().token:''}` },
      })
      .then((res) => {
        setLoading(false);
        if (res.data) {
          setLoading(false);
          setData(res.data.payload);
          return "done";
        } else {
          setData([]);
          return "done";
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
        return null;
      });
    return response;
  }, []);

  const setUnFollow = useCallback(async (id: number) => {
    setLoading(true);
    let response = await axios
      .delete(apis.unFollow(id), {
        headers: { Authorization: `Bearer ${getLocalStorage()?getLocalStorage().token:''}` },
      })
      .then((res) => {
        setLoading(false);
        if (res.data) {
          setLoading(false);
          setData(res.data.payload);
          return "done";
        } else {
          setData([]);
          return "done";
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
        return null;
      });
    return response;
  }, []);
  return { followData, followError, isFollowLoading, setFollow, setUnFollow };
};
