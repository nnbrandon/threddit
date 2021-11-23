import React from 'react';
import ThredditRouter from './components/ThredditRouter';

function App() {
  window.addEventListener("load",function() {
    setTimeout(function(){
        // This hides the address bar:
        window.scrollTo(0, 1);
    }, 0);
  });
  return <ThredditRouter />;
}

export default App;
