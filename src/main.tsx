import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, MantineProvider } from '@mantine/core';
import App from './App.tsx'

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './index.css'
import {TaskProvider} from "./context/TaskContext.tsx";

const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'cyan',
    colors: {
        'ocean-blue': ['#7AD1DD', '#5FCCDB', '#44CADC', '#2AC9DE', '#1AC2D9', '#11B7CD', '#09ADC3', '#0E99AC', '#128797', '#147885'],
        'bright-pink': ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82', '#AD1374'],
    },
    breakpoints: {
        xs: '30em',
        sm: '48em',
        md: '64em',
        lg: '74em',
        xl: '90em',
    },
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <MantineProvider defaultColorScheme="auto" theme={theme}>
          <TaskProvider>
            <App />
          </TaskProvider>
      </MantineProvider>
  </StrictMode>,
)
