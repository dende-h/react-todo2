import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { TodoEditPage } from "./components/TodoEditPage";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todoEdit" element={<TodoEditPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
