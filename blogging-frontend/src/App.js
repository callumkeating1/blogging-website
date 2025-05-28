import logo from './logo.svg';
import './App.css';
function testConnection() {
  fetch("http://localhost:5000")
  .then(response => response.text())
   .then((response) => {
       console.log(response)
   });
}
function App() {
  return (
    <div className="App">
      <button onClick={testConnection}>check connection</button>
    </div>
  );
}

export default App;
