import { Center, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import { memo, useEffect } from "react";
import { UserCard } from "../Items/UserCard";
import { useFetchUsers } from "../../Hooks/useFetchUsers";

export const UserPage = memo(() => {
  const { getUsers, users, loading } = useFetchUsers();

  useEffect(() => getUsers(), []);
  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                userId={user.id}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
    </>
  );
});
