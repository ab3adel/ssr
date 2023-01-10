import { useCallback, useContext, useEffect, useState } from "react";
import axios from "./axios";
import { apis } from "./apis";
import authContext from "../context/auth-context/auth-context";
import { getLocalStorage } from "../getLocalstorage";
export const useIncreaseViews = () => {
  const [isViewsLoading, setLoading] = useState<boolean>(false);
  const [viewsData, setData] = useState<any[]>();
  const [viewsError, setError] = useState<string>("");
 
  const setView = useCallback(async (id: number) => {
    setLoading(true);
    let response = await axios
      .get(apis.increaseViews(id), {
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


  return { setView, viewsData, isViewsLoading, viewsError };
};
