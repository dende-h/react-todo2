import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { TodoEditPage } from "./components/TodoEditPage";
import { RecoilRoot } from "recoil";

export const App = () => {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route path="/" element={<Home />} />
              <Route path="todoEdit" element={<TodoEditPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
};
