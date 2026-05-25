import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Theme, presetGpnDefault} from '@consta/uikit/Theme'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Theme preset={presetGpnDefault}>
          <App />
        </Theme>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
