import React, { useState, useEffect } from 'react';
import './App.css';

//This is only a simple function to fetch from a WP and using it as headless. Connection is working and this could later be developed for the recipe-app that I was thinking about.
// function App() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch(
//       'https://elementorprotraining.fotografmikaeljonsson.se/wp-json/wp/v2/test'
//     )
//       .then((response) => response.json())
//       .then((data) => setData(data));
//   }, []);

//   return (
//     <div className='App'>
//       <h1>Testing</h1>
//       {data.map((post) => (
//         <div key={post.id}>
//           <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h2>
//           <div
//             dangerouslySetInnerHTML={{ __html: post.content.rendered }}
//           ></div>
//         </div>
//       ))}
//     </div>
//   );
// }

function App() {
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [shipName, setShipName] = useState('');
  const [shipCapacity, setShipCapacity] = useState('');

  const fetchData = () => {
    fetch('https://newmetsaapi.azurewebsites.net/api/ships/')
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  const toggleData = () => {
    if (showData) {
      setShowData(false);
    } else {
      fetchData();
      setShowData(true);
    }
  };

  const addShip = () => {
    fetch('https://newmetsaapi.azurewebsites.net/api/ships/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: shipName,
        capacity: parseInt(shipCapacity),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchData();
        setShipName('');
        setShipCapacity('');
      });
  };

  return (
    <div className='App'>
      <h1>Testing</h1>
      <button onClick={toggleData}>
        {showData ? 'Hide Data' : 'Show Data'}
      </button>
      {showData &&
        data.map((ship) => (
          <div key={ship.id}>
            <h2>{ship.name}</h2>
            <div>Capacity: {ship.capacity}</div>
          </div>
        ))}
      <div>
        <input
          value={shipName}
          onChange={(e) => setShipName(e.target.value)}
          placeholder='Ship Name'
        />
        <input
          type='number'
          value={shipCapacity}
          onChange={(e) => setShipCapacity(e.target.value)}
          placeholder='Ship Capacity'
        />
        <button onClick={addShip}>Add Ship</button>
      </div>
    </div>
  );
}
