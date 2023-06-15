"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("react-dom/client"));
require("./index.css");
const reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
const root = client_1.default.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      {/* The rest of your app components go here */}
    </React.StrictMode>
  );
  
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, reportWebVitals_1.default)();
