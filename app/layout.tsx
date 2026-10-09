import './globals.css';
import { ReactNode } from 'react';
export const metadata={title:'Lokesh Warke — Full-Stack Developer',description:'Premium full-stack developer portfolio for Lokesh Warke.'};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="en"><body className="noise">{children}</body></html>}
