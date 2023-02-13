import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import LoadingSpinner from "./LoadingSpinner";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showTitle, setShowTitle] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (searchTerm.trim().length === 0) {
      alert("please add search query");
      return;
    }
    setIsLoading(true);
    axios
      .get(
        `https://api.serpwow.com/live/search?api_key=5BE9A2B6F84E4F4D958FF6DA466AB6D0&engine=yahoo&q=${searchTerm}`
      )
      .then(function (response) {
        setIsLoading(false);
        setShowTitle(response.data.organic_results);
        setData(response.data);
      });
  };

  console.log(data, "data");

  const renderUser = (
    <div className="userlist-container">
      {showTitle &&
        showTitle.map((item) => {
          return (
            <div style={{ paddingLeft: "7rem", paddingRight: "7rem" }}>
              <div style={{ textAlign: "left" }}>
                <p style={{ textAlign: "left", marginBottom: "4px" }}>
                  {item.title}
                </p>

                <a
                  href={`${item.link}`}
                  style={{ textAlign: "left", fontSize: "24px" }}
                >
                  {" "}
                  {item.displayed_link}
                </a>
                <p style={{ marginTop: "12px" }}> {item.snippet}</p>
              </div>
              <br />
            </div>
          );
        })}
    </div>
  );

  return (
    <div className="App">
      <header className="">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            placeholder="Search"
            style={{
              paddingLeft: "12px",
              paddingRight: "12px",
              width: "50%",
              height: "50px",
            }}
            value={searchTerm}
            required
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <buttton
            className="srch-btn"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Submit{" "}
          </buttton>
        </div>
        {isLoading ? <LoadingSpinner /> : renderUser}
      </header>
    </div>
  );
}

export default App;
