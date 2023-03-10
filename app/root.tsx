import { LiveReload, Outlet, Links, Scripts, Meta } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import { cssBundleHref } from '@remix-run/css-bundle';
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import 'the-new-css-reset/css/reset.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '~/modules/global.module.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export function Document({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <html lang="en">
        <head>
          <Links />
          <Meta />
        </head>
        <body>
          {children}
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </React.Fragment>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <div className="error-container">
        <h1>App Error</h1>
        <pre>{error.message}</pre>
      </div>
    </Document>
  );
}

export const links: LinksFunction = () => {
  return [
    ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  ];
};

export default function App() {
  return (
    <Document>
      <ThemeProvider theme={darkTheme}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Outlet />
        </LocalizationProvider>
      </ThemeProvider>
    </Document>
  );
}
