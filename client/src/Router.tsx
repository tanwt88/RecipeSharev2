import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";
import Homepage from "./pages/Homepage"
import AdminHomePage from './pages/AdminHomePage';
import AdminLoginPage from "./pages/AdminLoginPage";
import FeedbackModerator from "./pages/FeedbackModerator";
import FeedbackPage from "./pages/FeedbackPage";
import ReportModerator from "./pages/ReportModerator";
import ReportPage from "./pages/ReportPage";
import NewRecipe from "./pages/NewRecipe";
import EditRecipes from "./pages/EditRecipes"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/admin" element={<AdminLoginPage/>} />
        <Route path="/admin/:id/feedbackmoderator" element={<FeedbackModerator/>} />
        <Route path="/home/:id/feedback" element={<FeedbackPage/>} />
        <Route path="/admin/:id/reportmoderator" element={<ReportModerator/>} />
        <Route path="/home/:id/report" element={<ReportPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/home/:id" element={<Homepage/>} />
        <Route path="/home/:id" element={<AdminHomePage/>} />
        <Route path="/home/:id/editrecipe/:recipeid" element={<EditRecipes/>} />
        <Route path="/home/:id/newrecipe" element={<NewRecipe/>} />
        <Route element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
