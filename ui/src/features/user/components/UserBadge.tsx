import { useGetCurrentUserQuery } from "../../../data/rest/users/api";

export default function UserBadge() {
  const { data } = useGetCurrentUserQuery();

  return <span>{data ? <span>{data.name}</span> : <span>Loading...</span>}</span>;
}
