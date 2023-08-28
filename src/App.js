import React, { useState, useEffect } from 'react';
import './App.css';

//This is only a simple function to fetch from a WP and using it as headless. Connection is working and this could later be developed for the recipe-app that I was thinking about.
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      'https://elementorprotraining.fotografmikaeljonsson.se/wp-json/wp/v2/test'
    )
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className='App'>
      <h1>Hey</h1>
      {data.map((post) => (
        <div key={post.id}>
          <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h2>
          <div
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          ></div>
        </div>
      ))}
    </div>
  );
}

export default App;
