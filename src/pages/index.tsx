import { type NextPage } from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import { UserRole } from "@/types";

const Home: NextPage = () => {
  const nextMatch = api.matchday.nextMatchday.useQuery();

  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          New football <span className="text-pink">Check-in</span> App update
        </h1>
        <div className="flex flex-col items-center gap-2">
          {nextMatch.data ? (
            <>
              <p className="text-2xl text-white">
                {nextMatch.data?.date.toString()}
              </p>
              <p className="text-2xl text-white">
                {nextMatch.data?.location} - {nextMatch.data?.address}
              </p>
              <p className="text-2xl text-white">
                {nextMatch.data?.total} - {nextMatch.data?.fee}
              </p>
            </>
          ) : (
            <p className="text-2xl text-white">
              No matchdays available. Please check back later.
            </p>
          )}
          <AuthShowcase />
        </div>
      </div>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      {sessionData?.user?.role === UserRole.ADMIN && (
        <>
          <Link href="/matchdays/new">
            <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
              Add matchday
            </button>
          </Link>
          <Link href="/billing">
            <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
              Billing
            </button>
          </Link>
        </>
      )}
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
