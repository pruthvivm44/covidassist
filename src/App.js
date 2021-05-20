import Navibar from './components/navbar/navibar';
import {BrowserRouter,Route} from 'react-router-dom'
import Banner from './components/banner/banner';
import Volunteer from './components/volunteer/volunteer'
import Leads from './components/leads/leads';
import Resources from './components/resources/resources';
import Disclaimer from './components/shared/disclaimer';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navibar />
        <Route exact path={process.env.PUBLIC_URL +'/'} component={Banner}/>
        <Route exact path={process.env.PUBLIC_URL +'/volunteer'} component={Volunteer}/>
        <Route exact path={process.env.PUBLIC_URL +'/leads'} component={Leads}/>
        <Route exact path={process.env.PUBLIC_URL +'/resources'} component={Resources}/>
        <Route exact path={process.env.PUBLIC_URL +'/disclaimer'} component={Disclaimer}/>
      </div>
    </BrowserRouter>
  );
}

export default App;