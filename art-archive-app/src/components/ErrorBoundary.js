"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
class ErrorBoundary extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error('Error:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return Something;
            went;
            wrong. < /h1>;;
        }
        return this.props.children;
    }
}
function App() {
    return ({ /* Your App component code */}
        < /ErrorBoundary>);
}
;
exports.default = ErrorBoundary;
