import Navibar from './components/navbar/navibar';
import {BrowserRouter,Route} from 'react-router-dom'
import Banner from './components/banner/banner';
import Volunteer from './components/volunteer/volunteer'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navibar />
        <Route exact path={process.env.PUBLIC_URL +'/'} component={Banner}/>
        <Route exact path={process.env.PUBLIC_URL +'/volunteer'} component={Volunteer}/>
      </div>
    </BrowserRouter>
  );
}

export default App;