import { createMuiTheme, ThemeProvider } from "@material-ui/core"
import React from "react"
import ReactDOM from "react-dom"
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useHistory,
    useLocation,
    useParams,
    withRouter
} from "react-router-dom";

import { Main as MainLayout } from './components/layout'
import { About, Auth, Chat } from "./pages"

import "./index.css"

const Menu = () => {
    return (
        <>
            <Link to="/about">About</Link>
            <Link to="/auth">Auth</Link>
            <Link to="/chat">Chat</Link>
        </>
    )
}

const RouterContent = (theme) => {
    return (
        <Chat theme={theme}/>
        // <BrowserRouter>
        //     <div>
        //         <Menu/>
        //         <Switch>
        //             <Route path="/chat">
        //                 <Chat theme={theme}/>
        //             </Route>
        //             <Route path="/about">
        //                 <About/>
        //             </Route>
        //             <Route path="/auth">
        //                 <Auth/>
        //             </Route>
        //             <Route path="*" component={() => <h1>404</h1>} />
        //         </Switch>
        //     </div>
        // </BrowserRouter>
    )
}

const theme = createMuiTheme()

ReactDOM.render(
    <RouterContent theme={theme}/>,
  document.getElementById("root"),
)