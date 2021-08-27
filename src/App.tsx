import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [projects, setProjects] = useState<any>([]);

  function loadProjects() {
    axios
      .post("http://localhost:7777/getProjects")
      .then(function (response) {
        // handle success
        console.log(response);
        setProjects(response.data.projects);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  useEffect(() => {
    /*
    let datas = [];
    for (let i = 0; i < 7; i++) {
      datas.push({
        desc: `프로젝트 계획`,
        name: `프로젝트 명 ${i + 1}`,
        money: Math.floor(Math.random() * 200000) + 100000,
      });
    }
    */
    loadProjects();

    //setProjects(datas);
  }, []);

  function addProject() {
    let data = {
      desc: `프로젝트 계획`,
      name: `프로젝트 명 ${projects.length + 1}`,
      money: Math.floor(Math.random() * 200000) + 100000,
    };
    setProjects([...projects, data]);
  }

  function deleteProject(project: any) {
    console.log("delete", project);
    let idx = project.idx;
    axios
      .post("http://localhost:7777/deleteProject", {
        idx,
      })
      .then(function (response) {
        // handle success
        console.log(response);
        loadProjects();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  return (
    <div className="projects">
      {projects.map((project: any) => (
        <div className="project" key={project.idx}>
          <div className="desc">{project.desc}</div>
          <div className="name">{project.name}</div>
          <div className="money">목표 금액 : {project.money}</div>
          <div
            className="delete"
            onClick={() => {
              deleteProject(project);
            }}
          >
            Delete
          </div>
        </div>
      ))}
      <div className="project" onClick={addProject}>
        <div className="add">Add Project</div>
      </div>
    </div>
  );
}

function LeftMenu() {
  return (
    <div className="menus">
      <div className="menu">
        <Link to="/">Home</Link>
      </div>
      <div className="menu">
        <Link to="/donate">Donate</Link>
      </div>
      <div className="menu">
        <Link to="/project">Project</Link>
      </div>
    </div>
  );
}

function Donate() {
  return (
    <div>
      <div className="Donations">
      <div className="img">후원 이미지</div>
      <div className="Dname">후원 이름</div>
      <div className="Ddonation">후원 금액</div>
      </div>
    </div>
  )
}
    

function Project() {
  return (
  <div>
    <div className="Pmenus">기부하는 이유 동영상
    <iframe className="Youtube" width="560" height="315" src="https://www.youtube.com/embed/80bNntJbUeg" 
      title="YouTube video player" frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowFullScreen></iframe>
    </div>
    <div className="Pline"></div>

    <div className="Pmenu">
      <div className="Pro">기부 리스트</div>
      <div className="Pro">기부 리스트</div>
      <div className="Pro">기부 리스트</div>
    </div>

    <div className="Pline2"></div>
  </div>
    
  
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <div className="left-menu">
          <LeftMenu />
        </div>
        <div className="right-menu">Right Menu</div>
        <div className="content">
          <Switch>
            <Route path="/donate">
              <Donate />
            </Route>
            <Route path="/project">
              <Project />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
