import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";

const Protected: NextPage = (): JSX.Element => {
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("api/auth/signin");
  }, [status]);

  if (status === "authenticated") {
    console.log(data.user);
    return (
      <div>
        This page is Protected for special people. like{"\n"}
        {JSON.stringify(data.user)}
      </div>
    );
  } else {
    return <div>loading</div>;
  }
};

export default Protected;
