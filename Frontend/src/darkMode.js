import React, { useState } from 'react';

const DarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => setIsDark(prev => !prev);

  const styles = {
    backgroundColor: isDark ? '#121212' : '#fff',
    color: isDark ? '#fff' : '#000',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
  };

  return (
    <div style={styles}>
      <h1>{isDark ? 'Dark Mode' : 'Light Mode'}</h1>
      <button onClick={toggleDarkMode}>
        Switch to {isDark ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
};

export default DarkMode;
