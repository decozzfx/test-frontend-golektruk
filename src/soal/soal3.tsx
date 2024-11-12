import { useEffect, useMemo, useState } from "react";

export default function Soal3() {
  /**
   * ? 1. hilangkan semua error dan deskripsikan apa penyebab error.
   * ? 2. tampilkan data yang di panggil dari api tersebut...
   */

  return <SeachComponent />;
}

function SeachComponent() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<IApiResponse[]>([]);

  const onSearchData = useMemo(() => {
    return results.filter((result) => {
      return result.title.toLowerCase().includes(search.toLowerCase());
    });
  }, [results, search]);

  useEffect(() => {
    async function fetchData() {
      const response: Response = await fetch(
        `https://jsonplaceholder.typicode.com/photos/`
      );
      const data: IApiResponse[] = await response.json();
      setResults(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {onSearchData.length ? (
          onSearchData.map((result) => (
            <li style={{ color: "white" }} key={result.id}>
              {result.title}
            </li>
          ))
        ) : (
          <li style={{ color: "white" }}>Please wait...</li>
        )}
      </ul>
    </div>
  );
}

interface IApiResponse {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
