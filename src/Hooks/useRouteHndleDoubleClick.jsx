import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useRouteHandle = () => {
  const navigate = useNavigate();
  const onDoubleClick = useCallback((urlProps, props) => {
    navigate(urlProps, { state: props, replace: false });
  }, []);
  const onClick = useCallback((urlProps) => {
    navigate(urlProps);
  }, []);
  return { onDoubleClick, onClick };
};
