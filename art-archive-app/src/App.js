import React, { useState, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

const App = () => {
  return (
    <ErrorBoundary>
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;
