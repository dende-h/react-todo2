import { Box, Flex, Heading, Link, useDisclosure } from "@chakra-ui/react";
import { memo } from "react";
import { useRouteHandle } from "../../Hooks/useRouteHndleDoubleClick";
import { MenuIconButton } from "../button/MenuIconButton";
import { MenuDrawer } from "../MenuDrawer";

export const Header = memo(() => {
  const { onClose, isOpen, onOpen } = useDisclosure();

  const { onClick } = useRouteHandle();

  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: "pointer" }}
          onClick={() => onClick(`/home`)}
        >
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            TODOボード
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          flexGrow={2}
          display={{ base: "none", md: "flex" }}
        >
          <Box pr={4}>
            <Link onClick={() => onClick(`/calendar`)}>TODOカレンダー</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={() => onClick(`/userinfo`)}>ユーザー一覧</Link>
          </Box>
        </Flex>

        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer onClose={onClose} isOpen={isOpen} />
    </>
  );
});
