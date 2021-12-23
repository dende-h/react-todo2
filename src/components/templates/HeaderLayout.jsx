import { memo } from "react";
import { Header } from "../layout/Header";

const HeaderLayout = memo((props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
});
export default HeaderLayout;
