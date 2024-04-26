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
  const putData = async (endpoint: string, data = {}) => {
    try {
      const respose = await API.put(endpoint, data);
    } catch (error) {
      console.log(`getdata error`, error);
    }
  };
  const postData = async (endpoint: string, data: unknown) => {
    try {
      const result = await API.post(endpoint, data);

      return result;
    } catch (error) {
      console.error(`postData error`, error);
      return error;
    }
  };
  const pathDate = async (endpoint: string, data: unknown = {}) => {
    try {
      const result = await API.patch(endpoint, data);

      return result;
    } catch (error) {
      console.error(`pathDate error`, error);
      return error;
    }
  };
  const deletedDate =async(endpoint:string)=>{
    try {
      const result = await API.delete(endpoint);

      return result.data;
    } catch (error) {
      console.error(`pathDate error`, error);
      return error;
    }
  }
  return { getData, putData, postData,pathDate,deletedDate };
};
