import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import React, { useRef, useEffect } from "react";

const { tableau } = window;

const Sidebar = () => {
  const links = [
    { name: "Home", link: "/" },
    { name: "Tweet Counts", link: "counts" },
  ];

  return (
    <div className="links">
      {links.map((link) => (
        <Link key={link.link} to={link.link}>
          {link.name}
        </Link>
      ))}
    </div>
  );
};

const Landing = () => {
  return <div>Welcome to the App</div>;
};

const Counts = () => {
  const url =
    "https://public.tableau.com/views/Dashboard_16502224763340/Dashboard1";

  const ref = useRef(null);

  const initViz = () => {
    new tableau.Viz(ref.current, url, {
      width: "1000px",
      height: "800px",
      margin: 0,
      padding: "2rem",
    });
  };

  useEffect(() => initViz(), []);

  return (
    <div className="sectionContent">
      <div className="tableauContent" ref={ref} />
      <div className="tableauText">
        Bar Chart: The bar chart shows the number of tweets posted in each area.
        It can be observed in the chart that Downtown, Weston and Northwest have
        the highest number of tweets having the word earthquake in them. This
        could mean these areas were most severly affected by the earthquake.
        Another possibility could be that the areas most affected by earthquakes
        were so severly affected that the network connectivity in these areas
        was disrupted and thus there are no tweets from the most badly affected
        areas. <br /> Line Chart: The line chart shows the number of tweets
        containing the word "earthquake" posted across four days. From the chart
        it can be observed that the number of such tweets posted were higher on
        April 8th 2020, than on other days in Downtown, Southton, Northwest and
        Cheddarford areas.
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <div className="App">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          <div className="header">
            <h1>Welcome to Veda!</h1>
          </div>
          <div className="contentArea">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="counts" element={<Counts />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
