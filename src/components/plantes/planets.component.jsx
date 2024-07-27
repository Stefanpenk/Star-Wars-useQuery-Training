import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Planet from "../planet/planet.component";
import { useState } from "react";

const fetchPlanets = async ({ queryKey }) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${queryKey[1]}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["planets", page],
      queryFn: fetchPlanets,
      placeholderData: keepPreviousData,
    });
  console.log(data);

  return (
    <div>
      <h2>Planets</h2>

      {isPending ? (
        <div>Loading data...</div>
      ) : isError ? (
        <div>Error fetching data</div>
      ) : (
        <div>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>{page}</span>
          <button
            onClick={() =>
              setPage((prev) => (!data || !data.next ? prev : prev + 1))
            }
            disabled={!data || !data.next}
          >
            Next
          </button>
          {data.results.map((planet) => (
            <Planet planet={planet} />
          ))}
        </div>
      )}
      {isFetching ? <span> Loading...</span> : null}
    </div>
  );
};

export default Planets;
