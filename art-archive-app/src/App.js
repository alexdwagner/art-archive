import React, { useState, useEffect } from "react";
import FileTable from "./components/FileTable";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/uploads/");
        const data = await response.json();
        console.log("Fetched data:", data);
        setData(data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onDataChange = (newData) => {
    setData(newData);
  };

  const columnWidths = [30, 200, 100, 100, 100];

  return (
    <div>
      <FileTable
        data={data}
        onDataChange={onDataChange}
        columnWidths={columnWidths}
      />
    </div>
  );
};

export default App;
