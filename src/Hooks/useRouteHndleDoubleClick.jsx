import { useNavigate } from "react-router-dom";

export const useRouteHandleDoubleClick = () => {
  const navigate = useNavigate();
  const onDoubleClick = (urlProps, props) => {
    navigate(urlProps, { state: props, replace: false });
  };
  return { onDoubleClick };
};
