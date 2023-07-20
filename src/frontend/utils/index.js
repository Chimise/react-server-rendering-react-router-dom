export const getData = async (...args) => {
    const response = await fetch(...args);
    if(!response.ok) {
        throw new Response('Not Found', {
            status: response.status
        })
    }
    
    return response;
  }