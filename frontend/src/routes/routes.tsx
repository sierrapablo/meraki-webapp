import { Routes, Route } from "react-router";
import HomePage from "../pages/HomePage";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
    );
};

export default AppRoutes;