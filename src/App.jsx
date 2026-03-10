import AppRouter from "./routers/AppRouter";
import { Loader } from "./components/Loader/Loader";

function App() {
  return (
    <div>
      <Loader>
        <AppRouter />
      </Loader>
    </div>
  );
}

export default App;
