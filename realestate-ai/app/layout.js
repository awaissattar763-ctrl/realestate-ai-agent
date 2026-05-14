export const metadata = {
  title: "RealEstate AI Agent — Demo",
  description: "AI-powered real estate assistant with built-in demo data. Property search, lead gen, ROI analysis, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#07070f" }}>
        {children}
      </body>
    </html>
  );
}
