import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme/theme";
import { Router } from "./Router/Router";
import { RecoilStatePersist } from "./components/atoms/RecoilStatePersist";
import { todoListState } from "./components/atoms/todoListState";

const initializeState = (mutableSnapshot) => {
  const item = localStorage.getItem(todoListState.key);
  if (item) {
    mutableSnapshot.set(todoListState, JSON.parse(item).value);
  }
};

export const App = () => {
  console.log("App");

  return (
    <ChakraProvider theme={theme}>
      <Toaster position="top-center" reverseOrder={false} />
      <RecoilRoot initializeState={initializeState}>
        <RecoilStatePersist />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </RecoilRoot>
    </ChakraProvider>
  );
};
