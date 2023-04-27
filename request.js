const sendJSONToServer = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        body: userData,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

sendJSONToServer({})