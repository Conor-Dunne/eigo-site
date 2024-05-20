const getData = async (id) => {

    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://eigo-site.vercel.app' 
      : 'http://localhost:3000';
  
  
    const res = await fetch(`${baseUrl}/api/posts/${id}`, {
      cache: "no-store",
    });
  
    if (!res.ok) {
      throw new Error("Failed");
    }
  
    return res.json();
  };

  export default getData