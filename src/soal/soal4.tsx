import { useState, useRef, useEffect, useCallback } from "react";

const BASE_URL = "https://pokeapi.co/api/v2";

const fetchPokemon = async (offset: number, limit: number) => {
  const response = await fetch(
    `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
  );
  const data: IApiResponse = await response.json();
  return data.results;
};

const Soal4 = () => {
  const [pokemonList, setPokemonList] = useState<Result[]>([]);
  console.log("🚀 ~ Soal4 ~ pokemonList:", pokemonList);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 20; // Number of Pokémon to fetch each time
  const observer = useRef<HTMLDivElement | null>(null);

  const loadMorePokemons = useCallback(async () => {
    setLoading(true);
    const newPokemons = await fetchPokemon(offset, limit);
    setPokemonList((prev) => [...prev, ...newPokemons]);
    setOffset((prev) => prev + limit);
    setLoading(false);
  }, [offset]);

  useEffect(() => {
    loadMorePokemons(); // Load initial Pokémon
  }, []);

  useEffect(() => {
    const handleScroll = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        loadMorePokemons();
      }
    };

    const observerInstance = new IntersectionObserver(handleScroll, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (observer.current) {
      observerInstance.observe(observer.current);
    }

    return () => {
      if (observer.current) {
        observerInstance.unobserve(observer.current);
      }
    };
  }, [loadMorePokemons, loading]);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#282c34",
        color: "white",
        padding: "20px",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        <h1 style={{ fontWeight: "bolder" }}>Pokémon Infinite Scroll</h1>

        <div>
          {pokemonList.map((pokemon, index) => (
            <div key={index} style={{ margin: "10px 0" }}>
              {pokemon.name}
            </div>
          ))}
        </div>

        {loading && <p>Loading more Pokémon...</p>}

        {/* This div will be the target for the Intersection Observer */}
        <div ref={observer} style={{ height: "20px" }} />
      </div>

      <iframe
        src="/soal4.mp4"
        style={{
          height: "100vh",
          border: "1px solid white",
        }}
      ></iframe>
    </div>
  );
};

export default Soal4;

interface IApiResponse {
  count: number;
  next: string;
  previous: string;
  results: Result[];
}

interface Result {
  name: string;
  url: string;
}
