import TextEditor from "./TextEditor";
import "./TextEditor.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Redirect } from "react-router-dom";
import { v4 as uuidV4 } from "uuid"
function App() {
  return (
    <div>
      <Router>
      <Switch> 
      <Route path="/" exact> 
      <Redirect to={`/documents/${uuidV4()}`}/>
      </Route>
      <Route path="/documents/:id" exact> 
      <TextEditor/>
      </Route> 
      </Switch>
     </Router>
    </div>
  );
}

export default App;
