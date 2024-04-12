import { API } from "@/API";

export const useFetch = () => {
  const getData = async (endpoint: string) => {
    try {
      const data = await API.get(endpoint);
      return data;
    } catch (error) {
      console.log(`getdata error`, error);
    }
  };
  const putData = async (endpoint: string) => {
    try {
      await API.put(endpoint);
    } catch (error) {
      console.log(`getdata error`, error);
    }
  };
  const postData = async (endpoint: string,data:unknown)=>{
    try {
      await API.post(endpoint,data)
    } catch (error) {
      console.error(`postData error`, error);
    }
  }
  return { getData, putData,postData };
};
