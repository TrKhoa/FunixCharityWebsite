import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/extra.css";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import Main from "./layout/main";

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Main />
            </Provider>
        </BrowserRouter>
    );
}

export default App;
