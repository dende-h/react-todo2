import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay
} from "@chakra-ui/react";
import { memo } from "react";
import { useRouteHandle } from "../Hooks/useRouteHndleDoubleClick";

export const MenuDrawer = memo((props) => {
  const { onClose, isOpen } = props;

  const { onClick } = useRouteHandle();
  return (
    <>
      <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerBody p={0} bg="gray.100">
              <Button w="100%" onClick={() => onClick(`/home`)} S>
                Top
              </Button>
              <Button w="100%" onClick={() => onClick(`/calendar`)}>
                Todoカレンダー
              </Button>
              <Button w="100%" onClick={() => onClick(`/userinfo`)}>
                ユーザー一覧
              </Button>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
});
