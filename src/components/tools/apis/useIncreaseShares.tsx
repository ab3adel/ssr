import { useCallback, useContext, useEffect, useState } from "react";
import axios from "./axios";
import { apis } from "./apis";
import authContext from "../context/auth-context/auth-context";
import { getLocalStorage } from "../getLocalstorage";
export const useSharePost = () => {
  const [isShareLoading, setLoading] = useState<boolean>(false);
  const [shareData, setData] = useState<any[]>();
  const [shareError, setError] = useState<string>("");
 
  const setShare = useCallback(async (id: number) => {
    setLoading(true);
    let response = await axios
      .get(apis.increaseShares(id), {
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


  return { setShare, shareData, isShareLoading, shareError };
};
