import { API } from "@/API";

export const useFetch = () => {
  const getData = async (endpoint: string) => {
    try {
      const data = await API.get(endpoint);
    return data  
    } catch (error) {
        console.log(`getdata error`,error);
        
    }
    
  };
  return {getData};
};
