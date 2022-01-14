import Link from "next/link";
import { useGetCurrentUserQuery } from "../client/graphql/getCurrentUser.generated";

function Homepage() {
  const [{ data }] = useGetCurrentUserQuery();

  return (
    <>
      <h1>MyDPO</h1>
      <h2>Maybe this should be a nice landing page?</h2>
      {!data?.currentUser ? (
        <>
          <Link href="/login">Login</Link>
        </>
      ) : (
        <Link href="/app">Go to dashboard</Link>
      )}
    </>
  );
}

export default Homepage;
