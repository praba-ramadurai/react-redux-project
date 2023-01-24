import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import AutoComplete from 'features/auto-complete/AutoComplete';
import ErrorBoundary from 'app/ErrorBoundary';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ErrorBoundary>
      <AutoComplete />
    </ErrorBoundary>
  </Provider>
);

