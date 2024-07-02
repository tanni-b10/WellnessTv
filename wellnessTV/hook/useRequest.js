import axios from 'axios'

const useRequest = () => {
    const fetchData = async (url, method, body, setter) => {
      try {
        const response = await axios({
          method: method,
          url: url,
          data: body, 
        });
        await setter(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }     };
  
    return { fetchData };
  };
  
export default useRequest