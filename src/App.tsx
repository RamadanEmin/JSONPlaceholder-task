import { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Loader from "./components/Loader";

const UserPage = lazy(() => import('./pages/UserPages'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));

function App() {
    return (
        <Router>
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path='/' element={<UserPage />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </Suspense >
    </Router>
    );
}

export default App