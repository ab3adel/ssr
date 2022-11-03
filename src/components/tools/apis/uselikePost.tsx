import { useCallback, useContext, useEffect, useState } from "react";
import axios from "./axios";
import { apis } from "./apis";
import authContext from "../context/auth-context/auth-context";
import { getLocalStorage } from "../getLocalstorage";
export const useLikePost = () => {
  const [isLikeLoading, setLoading] = useState<boolean>(false);
  const [likeData, setData] = useState<any[]>();
  const [likeError, setError] = useState<string>("");
  const { token } = useContext(authContext);
  const setLike = useCallback(async (id: number) => {
    setLoading(true);
    let response = await axios
      .get(apis.likePost(id), {
        headers: { Authorization: `Bearer ${getLocalStorage().token}` },
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
  useEffect(() => {
    console.log(likeError);
  }, []);
  const setUnLike = useCallback(async (id: number) => {
    setLoading(true);
    let response = await axios
      .delete(apis.unLikePost(id), {
        headers: { Authorization: `Bearer ${token.token}` },
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
  return { likeData, likeError, isLikeLoading, setLike, setUnLike };
};
