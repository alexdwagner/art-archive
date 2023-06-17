import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
const App = () => {
    return (React.createElement(ErrorBoundary, null,
        React.createElement("div", { className: "App" },
            React.createElement(Header, null),
            React.createElement(Main, null),
            React.createElement(Footer, null))));
};
export default App;
