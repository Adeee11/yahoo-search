import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import LoadingSpinner from "./LoadingSpinner";

function App(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showTitle, setShowTitle] = useState("");
  const [data, setData] = useState(null);
  const [search, setSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = new URLSearchParams(window.location.search);

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
      })
      .finally(() => {
        setIsLoading(false);
        setSearch(false);
      });
  };

  useEffect(() => {
    if (search) handleSubmit();
  }, [search]);

  useEffect(() => {
    const searchQuery = params.get("search");
    if (searchQuery === null) return;
    if (searchTerm !== searchQuery) setSearchTerm(searchQuery);
    setSearch(true);
  }, []);

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
        <form
          style={{ display: "flex", justifyContent: "center" }}
          onSubmit={(e) => e.preventDefault()}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchTerm.trim().length !== 0) {
              handleSubmit();
            }
          }}
        >
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
            type="submit"
            className="srch-btn"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Search{" "}
          </buttton>
        </form>
        {isLoading ? <LoadingSpinner /> : renderUser}
      </header>
    </div>
  );
}

export default App;
