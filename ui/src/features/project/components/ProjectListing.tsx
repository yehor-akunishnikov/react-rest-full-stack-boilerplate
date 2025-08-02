import { useGetProjectsQuery } from "../../../data/rest/projects/api";
import type { Project } from "../../../data/rest/projects/types";

type ItemProps = Pick<Project, "name" | "createdAt">;

function Item({ name, createdAt }: ItemProps) {
  return (
    <li>
      <span>{name}</span>
      <span>{createdAt}</span>
    </li>
  );
}

export default function ProjectListing() {
  const { data } = useGetProjectsQuery();

  return (
    <div>
      {(data ?? []).map((entity) => (
        <Item
          key={entity.id}
          name={entity.name}
          createdAt={entity.createdAt}
        />
      ))}
    </div>
  );
}
