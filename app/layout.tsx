
import './globals.css';
import Dashfront from './Dashfront'; // Correct import to avoid circular dependency


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Dashfront>{children}</Dashfront>
      </body>
    </html>
  );
}
