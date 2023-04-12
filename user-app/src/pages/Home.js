import { useState,useEffect} from "react";
import axios from 'axios';
function Home() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handlereset = () => {
    setRefresh(true);
  };
  const loadPost = async () => {
      setLoading(true);
      const response = await axios.get("https://randomuser.me/api");
      setPosts(response.data.results);
      setLoading(false);
  }
  useEffect(() => {
    loadPost();
  }, []);
  useEffect(() => {    
      if (refresh) {
      loadPost();
      setRefresh(false);
      }
  }, [refresh]);

    return (
      <div style={{
        textAlign:"left",
        padding:"10px 10px"
        }}>
       {loading ? (
        <h4>Loading...</h4>) :
        posts.map((item) =>
          <>
          <h4>Name - {item.name?.title} . {item.name?.first} {item.name?.last}</h4>
          <h4>Email - {item.email}</h4>
          </> 
        
        )
      }
      <button onClick={handlereset}>Refresh</button>
      </div>
      
    );
  }
  
  export default Home;