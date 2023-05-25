//import './globals.css'
import { Inter } from 'next/font/google';
import "./globals.css";
import './nav.css';
import "./lista-style.css";
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Orkestra',
  description: '| Sistema inteligente de venta remota'
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
