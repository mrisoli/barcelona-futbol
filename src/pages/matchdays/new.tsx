import { useCallback, useState } from "react";
import type { FormEvent } from "react";
import { type NextPage } from "next";
import { z } from "zod";

import { api } from "@/utils/api";

const NewMatchdayPage: NextPage = () => {
  const mutation = api.matchday.matchdayCreate.useMutation();
  const [matchDate, setMatchDate] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [total, setTotal] = useState(0);
  const [fee, setFee] = useState(0);

  const handleChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    switch (name) {
      case "date":
        setMatchDate(value || "");
        break;
      case "location":
        setLocation(value || "");
        break;
      case "address":
        setAddress(value || "");
        break;
      case "total":
        setTotal(parseInt(value) || 0);
        break;
      case "fee":
        setFee(parseInt(value) || 0);
        break;
      default:
        break;
    }
  }, []);
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const safeDate = z.date().safeParse(new Date(matchDate));
      if (safeDate.success) {
        const date = safeDate.data.getTime();
        mutation.mutate({
          date,
          location,
          address,
          total,
          fee,
        });
      }
    },
    [mutation, matchDate, location, address, total, fee]
  );
  return (
    <>
      <h1>NewMatchdayPage</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={matchDate}
            onChange={handleChange}
          />
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={handleChange}
          />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={handleChange}
          />
          <label htmlFor="total">Total</label>
          <input
            type="number"
            id="total"
            name="total"
            value={total}
            onChange={handleChange}
          />
          <label htmlFor="fee">Per Person</label>
          <input
            type="number"
            id="fee"
            name="fee"
            value={fee}
            onChange={handleChange}
          />
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
export default NewMatchdayPage;
