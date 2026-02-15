import "@style/App.scss";
import Wizard from "./Wizard";
import { exportExperimentsToExcel } from "./export";
function App() {
  return (
    <div className="App">
      <div className="wizard-app">
        <div className="wizard-app__container">
          <h1 className="wizard-app__title">The Wizard of Incentive</h1>
          <div className="wizard-app__content">
            <Wizard />
          </div>
          {import.meta.env.DEV && (
            <button onClick={exportExperimentsToExcel}>Export Data</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
