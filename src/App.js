import Routes from './routes';
import {AppProvider} from './Components/Container';
import './index.css';


function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;
