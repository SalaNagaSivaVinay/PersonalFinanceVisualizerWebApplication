import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Main App Wrapper */}
      <div className="bg-gray-50 min-h-screen">
        {/* Render the Component */}
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
