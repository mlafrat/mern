// src/App.js

import React from 'react';
import Login from './components/Login'; // Adjust the path based on your folder structure

const App = () => {
    return (
        <div className="App">
            {/* Your other components or routes */}
            <Login /> {/* Render the Login component where needed */}
        </div>
    );
};

export default App;
