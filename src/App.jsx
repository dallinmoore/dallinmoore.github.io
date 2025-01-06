import React from 'react';
import Navigation from './Components/Navigation';
import Projects from './Components/Projects';
import Experience from './Components/Experience';
import About from './Components/About';
import './App.css';

function App() {
  const navigationItems = ['Home', 'About', 'Experience', 'Projects'];
  
  return (
    <div className="App">
      <Navigation items={navigationItems} />
      <div className="main-content">
        <section id="home" className="App-header">
          <h1>Welcome to My Portfolio!</h1>
          <p>My name is Dallin Moore and I'm a student studying Data Analytics at Utah State University!</p>
        </section>
        <section id="about" className="section">
          <About />
        </section>
        <section id="experience" className="section">
          <Experience />
        </section>
        <section id="projects" className="section">
          <Projects />
        </section>
      </div>
    </div>
  );
}

export default App;
