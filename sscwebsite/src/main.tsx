import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import LanguageProvider from './i18n/LanguageProvider'
import ThemeProvider from './theme/ThemeProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
