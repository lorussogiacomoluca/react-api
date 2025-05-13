import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const endpoint = "https://lanciweb.github.io/demo/api/actors";
  const [actors, setActors] = useState([]);

  //Fetch API
  const fetchActors = () => {
    axios
      .get(endpoint)
      .then((response) => {
        setActors(response.data);
      })
      .catch((error) => console.error(error));
  };
  //useEffect for fetching data when loading
  useEffect(fetchActors, []);
  return (
    <>
      <div className="container py-4">
        <nav className="mb-4">
          <h1 className="text-center">Cast Fetching</h1>
        </nav>
        <div className="row g-4">
          {actors.map((actor) => (
            <div key={actor.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card shadow-sm h-100">
                <img
                  src={actor.image}
                  alt=""
                  className="card-img-top mt-2"
                  style={{ objectFit: "contain", height: "250px" }}
                />
                <div className="card-body">
                  <div className="actor-name"></div>
                  <div className="actor-birth"></div>
                  <div className="actor-nationality"></div>
                  <div className="actor-bio"></div>
                  <div className="actor-riconoscimenti"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
