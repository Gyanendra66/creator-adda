import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CursorGlow from "./components/CursorGlow";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import PageTransition from "./components/PageTransition";

const HomePage = lazy(() => import("./pages/HomePage"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const CreatorsPage = lazy(() => import("./pages/CreatorsPage"));
const CreatorProfilePage = lazy(() => import("./pages/CreatorProfilePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const PostJobPage = lazy(() => import("./pages/PostJobPage"));
const JobsPage = lazy(() => import("./pages/JobsPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const AccountDashboardPage = lazy(() => import("./pages/AccountDashboardPage"));
const AccountProfilePage = lazy(() => import("./pages/AccountProfilePage"));
const AccountSettingsPage = lazy(() => import("./pages/AccountSettingsPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const PressPage = lazy(() => import("./pages/PressPage"));
const HelpCenterPage = lazy(() => import("./pages/HelpCenterPage"));
const TrustSafetyPage = lazy(() => import("./pages/TrustSafetyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function RouteLoader() {
  return <div className="min-h-[60vh]" />;
}

function routeElement(element: React.ReactNode) {
  return (
    <PageTransition>
      <Suspense fallback={<RouteLoader />}>{element}</Suspense>
    </PageTransition>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={routeElement(<HomePage />)} />
        <Route path="/categories" element={routeElement(<CategoriesPage />)} />
        <Route path="/creators" element={routeElement(<CreatorsPage />)} />
        <Route path="/creator/:id" element={routeElement(<CreatorProfilePage />)} />
        <Route path="/search" element={routeElement(<SearchPage />)} />
        <Route path="/post-job" element={routeElement(<PostJobPage />)} />
        <Route path="/jobs" element={routeElement(<JobsPage />)} />
        <Route path="/login" element={routeElement(<LoginPage />)} />
        <Route path="/register" element={routeElement(<RegisterPage />)} />
        <Route path="/account" element={routeElement(<AccountDashboardPage />)} />
        <Route path="/account/profile" element={routeElement(<AccountProfilePage />)} />
        <Route path="/account/settings" element={routeElement(<AccountSettingsPage />)} />
        <Route path="/pricing" element={routeElement(<PricingPage />)} />
        <Route path="/about" element={routeElement(<AboutPage />)} />
        <Route path="/careers" element={routeElement(<CareersPage />)} />
        <Route path="/blog" element={routeElement(<BlogPage />)} />
        <Route path="/press" element={routeElement(<PressPage />)} />
        <Route path="/help" element={routeElement(<HelpCenterPage />)} />
        <Route path="/trust-safety" element={routeElement(<TrustSafetyPage />)} />
        <Route path="/terms" element={routeElement(<TermsPage />)} />
        <Route path="/privacy" element={routeElement(<PrivacyPage />)} />
        <Route path="*" element={routeElement(<NotFoundPage />)} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CursorGlow />
      <ScrollProgress />
      <div className="min-h-screen bg-dark-bg font-sans text-white">
        <div className="stars" />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
        <BackToTop />
      </div>
    </BrowserRouter>
  );
}
