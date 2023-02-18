import { useSession } from "next-auth/react";
import { api } from "../utils/api";
import { CheckIn } from "./check-in";

type Props = {
  matchdayId: string;
};

export const NextMatch = ({ matchdayId }: Props) => {
  const { data: sessionData } = useSession();
  const attendanceQuery =
    api.attendance.getAttendancesForMatchday.useQuery(matchdayId);

  const attendanceId =
    attendanceQuery.data?.find((a) => a.userId === sessionData?.user?.id)?.id ??
    null;

  return (
    <div className="flex flex-col items-center gap-2">
      {attendanceQuery.data ? (
        <>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">Attendance: </p>
            {attendanceQuery.data.map((a) => (
              <p key={a.id} className="text-2xl text-white">
                {a.userId}
              </p>
            ))}
          </div>
          <CheckIn matchdayId={matchdayId} attendanceId={attendanceId} />
        </>
      ) : (
        <>Loading</>
      )}
    </div>
  );
};
