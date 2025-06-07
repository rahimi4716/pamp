export const metadata = {
  title: 'PumpSniper',
  description: 'Pump Radar & Price Floor App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body dir="rtl" className="bg-gray-900 text-white p-4">
        {children}
      </body>
    </html>
  );
}