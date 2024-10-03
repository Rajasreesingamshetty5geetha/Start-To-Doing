import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleOAuthProvider clientId='944772145303-52u4au1semjrtadu6q9burv6i6sgr71c.apps.googleusercontent.com'>
        <body>
          {children}
        </body>
      </GoogleOAuthProvider>
    </html>
  );
}
