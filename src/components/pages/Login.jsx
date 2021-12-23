import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { memo, useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { PrimaryButton } from "../button/PrimaryButton";

export const Login = memo(() => {
  const [userId, setUserId] = useState();
  const { login, loading } = useAuth();
  const onChangeUserId = (e) => {
    setUserId(e.target.value);
  };
  const onClickLogin = () => login(userId);
  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          TODOボードアプリ
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input
            placeholder="ユーザーID"
            value={userId}
            onChange={onChangeUserId}
          />
          <PrimaryButton
            loading={loading}
            onClick={onClickLogin}
            disabled={userId === ""}
          >
            ログイン
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});
