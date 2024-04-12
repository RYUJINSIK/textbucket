"use client";
import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import WithHeaderLayout from "@/components/WithHeaderLayout";
const ChallengeListPage: React.FC = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/challenge/list?page=${page}&size=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("!", error);
      });
  }, []);

  return (
    <WithHeaderLayout>
      <div>ChallengeListPage</div>
    </WithHeaderLayout>
  );
};
export default ChallengeListPage;
