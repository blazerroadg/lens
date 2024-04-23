import { useEffect } from "react";
import "./App.css";
import { ApiProvider } from "./apiContext/ApiContext";
import SearchOrganization from "./components/pageComponents/SearchOrganization/SearchOrganization";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ApiProvider>
          <SearchOrganization />
        </ApiProvider>
      </header>
    </div>
  );
}

export default App;
