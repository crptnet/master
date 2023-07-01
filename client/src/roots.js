import ReactDOM from 'react-dom/client';

const sidebarRoot = ReactDOM.createRoot(document.getElementById('sidebar'));
const modelRoot = ReactDOM.createRoot(document.getElementById('model'));
const model2Root = ReactDOM.createRoot(document.getElementById('model2'));
const mainRoot = ReactDOM.createRoot(document.getElementById('main'));

export { sidebarRoot, modelRoot, model2Root, mainRoot };