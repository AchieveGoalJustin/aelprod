import React from "react";

import SchoolForm from "../../../components/admin/SchoolForm";
import SchoolAccountForm from "../../../components/admin/SchoolAccountForm";
import UserDisplay from "../../../components/admin/UserDisplay";

const { NEXT_PUBLIC_PATH_ROOT } = process.env;

const adminIndex = ({ schools }) => {
  return (
    <>
      <SchoolForm schools={schools} />;
      <SchoolAccountForm schools={schools} />
      <UserDisplay schools={schools} />
    </>
  );
};

export default adminIndex;

export async function getServerSideProps() {
  const response = await fetch(`${NEXT_PUBLIC_PATH_ROOT}/api/db/addSchool`, {
    method: "GET",
  });
  const data = await response.json();

  return {
    props: {
      schools: data.data,
    },
  };
}
