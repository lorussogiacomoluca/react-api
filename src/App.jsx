import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  //useState male/female
  const [gender, setGender] = useState("actors");
  const endpoint = `https://lanciweb.github.io/demo/api/${gender}`;
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
  useEffect(fetchActors, [gender]);

  let allAwards = [];

  for (let actor of actors) {
    if (actor.awards) {
      allAwards = allAwards.concat(actor.awards);
    }
  }

  const uniqueAwards = [...new Set(allAwards)];
  console.log(uniqueAwards);

  return (
    <>
      <div className="container py-4">
        <nav className="mb-4 d-flex justify-content-between">
          <h1>Cast Fetching - {gender === "actors" ? "Attori" : "Attrici"}</h1>
          <button
            onClick={() =>
              setGender(gender === "actors" ? "actresses" : "actors")
            }
            className="btn btn-outline-primary"
          >
            Scopri {gender === "actors" ? "attrici" : "attori"}
          </button>
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
                  {actor.awards && actor.awards !== "None" && (
                    <div className="actor-awards d-flex align-items-center mb-3">
                      <div className="award-icon">
                        <i className="fa-solid fa-award me-3"></i>
                      </div>
                      <div className="award-list">
                        {typeof actor.awards === "string"
                          ? actor.awards
                          : actor.awards.join(", ")}
                      </div>
                    </div>
                  )}
                  {actor[
                    gender === "actors" ? "known_for" : "most_famous_movies"
                  ]?.map((film, index) => (
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
