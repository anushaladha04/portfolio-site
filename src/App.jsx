import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChatBot from "./components/ChatBot";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));

function RouteFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-slate-100/50">
      <div className="w-12 h-12 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
      <p className="text-slate-500 text-sm">Loading...</p>
    </div>
  );
}

const App = () => {
  return (
    <main className="bg-slate-300/20 h-FULL">
        <Router>
            <Navbar />
            <ChatBot />
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
              </Routes>
            </Suspense>
        </Router>
    </main>
  )
}

export default App;