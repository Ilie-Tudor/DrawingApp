import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DrawingPage from "./pages/DrawingPage";
import MainPage from "./pages/MainPage";
import LoginRegisterPage from './pages/LoginRegisterPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import ContactPage from './pages/ContactPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import './App.css';


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={MainPage} />
          <Route path='/drawingPage/:wid' exact component={DrawingPage} />
          <Route path='/loginRegister' exact component={LoginRegisterPage} />
          <Route path='/about' exact component={AboutPage} />
          <Route path='/contact' exact component={ContactPage} />
          <Route path='/terms-of-service' exact component={TermsOfServicePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
