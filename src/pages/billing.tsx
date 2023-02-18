import { type NextPage } from "next";

import { api } from "@/utils/api";
import { useCallback } from "react";

const BillingPage: NextPage = () => {
  const debtors = api.attendance.getDebtors.useQuery();
  const markAsPaidMutation = api.attendance.markAsPaid.useMutation();
  const handleMarkAsPaid = useCallback(
    (id: string) => {
      markAsPaidMutation.mutate(id);
    },
    [markAsPaidMutation]
  );
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Billing page
      </h1>
      {debtors.data?.map((debtor) => (
        <div key={debtor.user.name} className="space-between flex flex-row">
          <div key={debtor.user.name} className="text-2xl text-white">
            {debtor.user.name}
          </div>
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={() => handleMarkAsPaid(debtor.id)}
          >
            Submit
          </button>
        </div>
      ))}
    </div>
  );
};

export default BillingPage;
