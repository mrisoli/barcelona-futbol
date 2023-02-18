import { useCallback } from "react";

import { api } from "@/utils/api";

type Props = {
  attendanceId: string | null;
  matchdayId: string;
};

export const CheckIn = ({ attendanceId, matchdayId }: Props) => {
  const checkInMutation = api.attendance.checkIn.useMutation();
  const checkOutMutation = api.attendance.checkOut.useMutation();

  const handleClick = useCallback(() => {
    attendanceId
      ? checkOutMutation.mutate(attendanceId)
      : checkInMutation.mutate(matchdayId);
  }, [attendanceId, matchdayId, checkInMutation, checkOutMutation]);

  return (
    <button
      className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      onClick={handleClick}
    >
      {attendanceId ? "Check out" : "Check in"}
    </button>
  );
};
