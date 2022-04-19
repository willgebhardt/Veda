import "./App.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import heatmap from "./modifiedbasemap.png";
import gif from "./temporalspread.gif";
import critical from "./heatmap.png";
import React, { useRef, useEffect } from "react";

const { tableau } = window;

const links = [
  { name: "Home", link: "" },
  { name: "Tweet Counts", link: "counts" },
  { name: "City Map", link: "heatmap" },
  { name: "Critical Message Map", link: "critical" },
];

const Sidebar = () => {
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
  return (
    <div className="sectionContent">
      <div className="tableauText">
        Welcome to Veda! Veda is a web-based visual analytics tool designed to
        display a variety of visualization reguarding earthquakes and their
        effects on the surounding area. Currently there are a few different
        opttions to look at. Firstly if you are looking for traditional charts
        to analyize tweet activity volume the Tweet Count tab is where to start.
        Next if you are looking for a quick heatmap to assess the areas most
        effected click the heatmaps tab.
      </div>
    </div>
  );
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
        Here we have two charts to help visualize the number of tweets in the
        area that referenced earthquakes. The first of these two is a simple bar
        chart. This chart can be used to show the area's most likely affected by
        an earthquake, by splitting up the data by locality. Here we can see
        that Downtown, Weston, and Northwest were quite likely to be hit by an
        earthquake due to having the highest number of tweets referenceing an
        earthquake. However there is one other possibility. These are the areas
        that were the most affected but still able to communicate. There is a
        chance that the areas most affected by an earthquake disrupted the
        network's connectivity and so few to no tweets could be made in that
        area.
        <br /> The second chart we can see is a line chart that shows the number
        of tweets per day mentioning earthquakes. Here we can observe that the
        most relevent tweets were sent out on April 8th 2020, from Downtown,
        Southton, Northwest, and Cheddarford.
      </div>
    </div>
  );
};

const Heatmap = () => {
  return (
    <div className="sectionContent">
      <div className="tableauContent">
        <img src={heatmap} alt="MAP" width="490" className="image" />
        <img src={gif} alt="MAP" width="490" className="image" />
      </div>
      <div className="tableauText">
        In these two images we can observe that throughout the occurrence of the
        earthquake, messages were constantly sent from two places: Downtown and
        Weston. Other areas had ups and downs in the messaging frequency. We
        also observe that the Wilson Forest area did not count any tweets. This
        observation brings to formulate the hypothesis that Wison Forest was not
        hit by the earthquake. It is understandable as the area is a forest and
        less populated compared to other neighborhoods. It is also important to
        highlight that the city is lucky that the earthquake has not been felt
        in Safe Town as it hosts the City's nuclear power plant. A hit in the
        area would have caused more damage citywide. While the lack of message
        can also be interpreted as the most damage, we can eliminate that
        hypothesis because a hard hit on Safe Town would have influenced Weston
        and Downtown. As we observed a high number of tweets in Downtown and
        Weston, we can eliminate the hypothesis that the lack of messages is due
        to more damage.
      </div>
    </div>
  );
};

const CritialMessage = () => {
  return (
    <div className="sectionContent">
      <div className="tableauContent">
        <img src={critical} alt="MAP" width="990" className="image" />
      </div>
      <div className="tableauText">
        In this map we have something a little different then the rate at which
        tweets were being sent out. Instead we have the overall percentage of
        earthquake related tweets as a proportion to actual tweets sent out.
        This information is less useful to tell us where an earthquake happened,
        as can be seen with Wilson Forest, but it does tell us peoples views. If
        certain areas are darker that means that many more tweets from those
        areas are related to earthquakes which means it is on peoples' minds
        more often. This is useful to track the overall concern for earthquakes
        through the city.
      </div>
    </div>
  );
};

function App() {
  const location = useLocation();
  return (
    <>
      <div className="App">
        <div className="sidebar">
          <h1>Veda</h1>
          <Sidebar />
        </div>
        <div className="content">
          <div className="header">
            <h1>
              {links.find((l) => "/" + l.link === location.pathname).name}
            </h1>
          </div>
          <div className="contentArea">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="counts" element={<Counts />} />
              <Route path="heatmap" element={<Heatmap />} />
              <Route path="critical" element={<CritialMessage />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
