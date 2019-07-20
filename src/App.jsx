import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import ToolBar from './components/ToolBar';
import ViewPort from './components/ViewPort/index';
import ObjectsPanel from './components/ObjectsPanel';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ToolBar />
        <ViewPort />
        <ObjectsPanel />
      </div>
    </Provider>
  );
}

export default App;
