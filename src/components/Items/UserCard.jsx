import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { memo } from "react";

export const UserCard = memo((props) => {
  const { imageUrl, userName, userId } = props;

  return (
    <>
      <Box
        w="220px"
        h="170px"
        bg="white"
        borderRadius="10px"
        shadow="md"
        p={4}
        _hover={{ cursor: "pointer", opacity: 0.8 }}
      >
        <Stack textAlign="center">
          <Image
            borderRadius="full"
            boxSize="80px"
            src={imageUrl}
            alt="プロフィール画像"
            m="auto"
          />
          <Text fontSize="lg" fontWeight="bold">
            {userName}
          </Text>
          <Text>{userId}</Text>
        </Stack>
      </Box>
    </>
  );
});
