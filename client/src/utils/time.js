export const getTime = async () => {
    try {
      const response = await fetch('http://localhost:3001/time', {
        method: 'GET',
        headers: {
          Authorization: 'mysecrettoken', 
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.epoch; 
      } else {
        console.error('Error fetching time:', response.statusText);
        return null;  
      }
    } catch (error) {
      console.error('Error fetching time:', error);
      return null;  
    }
  };
  