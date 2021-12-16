import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { TodoEditPage } from "./components/TodoEditPage";
import { RecoilRoot } from "recoil";
import { RecoilStatePersist } from "./components/atoms/RecoilStatePersist";
import { todoListState } from "./components/atoms/todoListState";
import { Toaster } from "react-hot-toast";

const initializeState = (mutableSnapshot) => {
  const item = localStorage.getItem(todoListState.key);
  if (item) {
    mutableSnapshot.set(todoListState, JSON.parse(item).value);
  }
};

export const App = () => {
  console.log("App");

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
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
