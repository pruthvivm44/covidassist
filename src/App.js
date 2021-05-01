import Navibar from './components/navbar/navibar';
import {BrowserRouter} from 'react-router-dom'
import Banner from './components/banner/banner';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navibar />
      <Banner />
    </div>
    </BrowserRouter>
  );
}

export default App;