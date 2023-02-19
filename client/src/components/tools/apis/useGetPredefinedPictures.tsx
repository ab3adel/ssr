import { useCallback, useContext, useEffect, useState } from "react";
import axios from "./axios";
import { apis } from "./apis";
import authContext from "../context/auth-context/auth-context";
import { getLocalStorage } from "../getLocalstorage";
export const useGetPredefinedPictures = () => {
  const [isPredefinedPicturesLoading, setLoading] = useState<boolean>(false);
  const [predefinedPicturesData, setData] = useState<any[]>();
  const [predefinedPicturesError, setError] = useState<string>("");

  const getPredefinedPictures = useCallback( () => {
    setLoading(true);
     axios
      .get(apis.predefiendPictures, {
        headers: { Authorization: `Bearer ${getLocalStorage()?getLocalStorage().token:''}` },
      })
      .then((res) => {
        setLoading(false);
        if (res.data) {
          setLoading(false);
          setData(res.data.payload);
         
        } else {
          setData([]);
       
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
       
      });
   
  }, []);

  
  return { predefinedPicturesData, predefinedPicturesError, isPredefinedPicturesLoading, getPredefinedPictures };
};
