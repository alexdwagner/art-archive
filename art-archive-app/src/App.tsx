import React, { useState, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/FileExplorer";
import FileExplorer from "./components/FileExplorer";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="App">
        <Header />
        <FileExplorer />
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;
