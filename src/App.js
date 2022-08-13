import Routes from './routes';
import {AppProvider} from '@Components/Container';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';


function App() {
  return (
    <AppProvider>
      <Routes />
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
