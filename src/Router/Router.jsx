import { Route, Routes } from "react-router-dom";
import { Login } from "../components/pages/Login";
import Page404 from "../components/pages/Page404";
import HeaderLayout from "../components/templates/HeaderLayout";
import { Home } from "../components/pages/Home";
import { TodoEditPage } from "../components/pages/TodoEditPage";
import { TodoCalendar } from "../components/pages/TodoCalendar";
import { UserPage } from "../components/pages/UserPage";

export const Router = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route
          exact
          path="/home"
          element={
            <HeaderLayout>
              <Home />
            </HeaderLayout>
          }
        />
        <Route
          exact
          path="/todoEdit/:id"
          element={
            <HeaderLayout>
              <TodoEditPage />
            </HeaderLayout>
          }
        />
        <Route
          exact
          path="/calendar"
          element={
            <HeaderLayout>
              <TodoCalendar />
            </HeaderLayout>
          }
        />
        <Route
          exact
          path="/userinfo"
          element={
            <HeaderLayout>
              <UserPage />
            </HeaderLayout>
          }
        />
        <Route exact path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};
