// import logo from './logo.svg';
import './App.css';
import AdminUi from "./components/AdminUi.js"

export const config={
  endPoint:"https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
};

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <AdminUi/>

    </div>
  );
}

export default App;
