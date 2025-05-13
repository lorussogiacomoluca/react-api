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
                  <div className="actor-infos text-secondary">
                    <div className="actor-birthdead">
                      {actor.death_year
                        ? actor.birth_year + " - " + actor.death_year
                        : actor.birth_year}
                    </div>
                    <div className="actor-nationality">{actor.nationality}</div>
                  </div>
                  <div className="actor-name">
                    <h3>{actor.name}</h3>
                  </div>
                  <hr />
                  <div className="actor-bio fst-italic fsz-2 mb-3">
                    {actor.biography}
                  </div>
                  {actor.known_for.map((film, index) => (
                    <div
                      key={index}
                      className="actor-known_for badge text-bg-primary me-2"
                    >
                      {film}
                    </div>
                  ))}
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
