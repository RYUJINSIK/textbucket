import PilsaCard, { IPilsaCardItem } from "../PilsaCard";

async function getData() {
  const res = await fetch(
    `http://223.130.135.113:8080/api/v1/pilsa/list?page=${1}&size=${10}`,
    { cache: "force-cache" }
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function PilsaCardList() {
  // Parse response to JSON
  const { data } = await getData();

  return (
    <ul>
      {data &&
        data?.map((pilsaInfo: IPilsaCardItem) => (
          <PilsaCard pilsaInfo={pilsaInfo} key={pilsaInfo.pilsaId} />
        ))}
    </ul>
  );
}
