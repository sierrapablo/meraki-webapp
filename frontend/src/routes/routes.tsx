import { Routes, Route } from "react-router";
import HomePage from "../pages/HomePage";
import PostPage from "../pages/PostPage";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:slug" element={<PostPage />} />
        </Routes>
    );
};

export default AppRoutes;