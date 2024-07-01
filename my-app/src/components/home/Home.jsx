import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const logs = localStorage.getItem("logged");

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:6060/api/blogs/viewblog")
      .then((response) => {
        console.log(response);
        setData(response.data.data.splice(0,3));
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);
  return (
    <>
      <div className="container-fluid homepage">
        <div class="wrapper nine">
          <div>
            <h1 class="rotate">
              <span>W</span>
              <span>E</span>
              <span>L</span>
              <span>C</span>
              <span>O</span>
              <span>M</span>
              <span>E</span>
            </h1>
          </div>
        </div>

        <h2 className="homehead">CREATE YOUR PASSION</h2>

        <div className="createbutton">
          {logs == 'true' ? (
            <>
              <Link to={"/postform"} className="linkline">
                <button class="btn" type="button">
                  <strong>CREATE BLOG</strong>
                  <div id="container-stars">
                    <div id="stars"></div>
                  </div>

                  <div id="glow">
                    <div class="circle"></div>
                    <div class="circle"></div>
                  </div>
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/register"} className="linkline">
                <button class="btn" type="button">
                  <strong>CREATE BLOG</strong>
                  <div id="container-stars">
                    <div id="stars"></div>
                  </div>

                  <div id="glow">
                    <div class="circle"></div>
                    <div class="circle"></div>
                  </div>
                </button>
              </Link>
            </>
          )}
        </div>

        <h6 className="homepara">
          Your go-to platform for sharing ideas, stories, and experiences.
          Discover diverse content, engage with a vibrant community, and unleash
          your creativity. Join us in building a space where every voice
          matters.
        </h6>
          <br /><br /><br /><br /><br /><br /><br />
        {data.map((objects) => (
          <div className="container homeblogs">
            <div className="row d-flex justify-content-center">
              <div className="col col-7 m-2">
                <img src="" alt="" />
                <div className="homebox">
                  <h2>{objects.title}</h2>
                  <h6>{objects.content}</h6>
                  <h5 style={{color:'grey'}}>- {objects.author}</h5>
                  <h6>{objects.timestamp}</h6>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
