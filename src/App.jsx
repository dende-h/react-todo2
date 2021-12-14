import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { TodoEditPage } from "./components/TodoEditPage";
import { RecoilRoot } from "recoil";
import { RecoilStatePersist } from "./components/atoms/RecoilStatePersist";
import { todoListState } from "./components/atoms/todoListState";

const initializeState = (mutableSnapshot) => {
  const item = localStorage.getItem(todoListState.key);
  if (item) {
    mutableSnapshot.set(todoListState, JSON.parse(item).value);
  }
};

export const App = () => {
  return (
    <>
      <RecoilRoot initializeState={initializeState}>
        <RecoilStatePersist />
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route path="/" element={<Home />} />
              <Route path="todoEdit/:id" element={<TodoEditPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
};
