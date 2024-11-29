export const getMetrics = async () => {
    const response = await fetch('http://localhost:3001/metrics', {
      headers: { 'Authorization': 'mysecrettoken' },
    });
    if (response.ok) {
      const data = await response.text();
      return data;
    }
    throw new Error('Failed to fetch metrics');
  };
  