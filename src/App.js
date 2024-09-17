import Navbar from './partials/nav';
import AddModal from './modal/addModal';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Container from './partials/container';
import Loading from './partials/loading';
import Error from './partials/error';

function App() {
  const [wallet, setWallet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorNetwork, setErrorNetwork] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const data = await axios.get(`${process.env.REACT_APP_SERVER_URL}/get-accounts`);
      setWallet(data.data.data)  
    } catch (e){
      if(e.code === 'ERR_NETWORK'){
        setErrorNetwork(true);
      }
    }
    setLoading(false);
  }

  const setIsLoading = async (childData) => {
    setLoading(childData)
  }

  useEffect(() => {
    getData();
  }, [])

  if(errorNetwork){
    return (
      <Error/>
    );
  }

  return (
    <>
      <Navbar/>
      <Container data={wallet} setLoading={setIsLoading}/>
      <AddModal isLoading={setIsLoading} refetch={getData}/>
      { loading && <Loading/>}
    </>
  );
}

 

export default App;
