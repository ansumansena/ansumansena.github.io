import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import Home from './pages/Home';

// The 404 is off the critical path, so it never ships in the first chunk.
const NotFound = lazy(() => import('./pages/NotFound'));

function AnimatedRoutes() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      {isHome && <Navbar />}

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Routes location={location}>
            <Route
              path="/"
              element={
                <main id="main">
                  <Home />
                </main>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<div className="min-h-[100svh]" />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </motion.div>
      </AnimatePresence>

      {isHome && <Footer />}
    </>
  );
}

export default function App() {
  return (
    // basename keeps routing correct when the site is served from a
    // /repo-name/ subpath on GitHub Pages. It is '/' everywhere else.
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
