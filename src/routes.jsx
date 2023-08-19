import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const Movies = lazy(() => import("./pages/Movies"));

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<></>}>
        <Routes>
          <Route
            path="/"
            Component={() => <Navigate to="/movies" replace={true} />}
          />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
