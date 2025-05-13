import axios from "axios";

function App() {
  const endpoint = "https://lanciweb.github.io/demo/api/actors/";
  const [actor, setActor] = useState([]);

  const fetchActor = () => {
    axios
      .get(endpoint)
      .then((response) => {
        setActor(response.data.results);
      })
      .error((error) => console.error(error));
  };
  return <></>;
}

export default App;
