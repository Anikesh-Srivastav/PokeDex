import { useEffect, useState } from 'react'
import '../index.css'
import PokemonCards from './PokemonCards';

const Pokemon = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const ApiKey = "YOUR API KEY HERE"

    const CatchingThePokemons = async () => {
        try {
            const res = await fetch(ApiKey);
            const data = await res.json();
     

            const rawDetailedListPokemons = data.results.map(async (currentPokemonDetails) => {
                const res = await fetch(currentPokemonDetails.url);
                const data = await res.json();
                return data;
                 });
                const detailedListPokemons = await Promise.all(rawDetailedListPokemons);
                console.log(detailedListPokemons);
                setPokemon(detailedListPokemons);
                setLoading(false);

              } catch (error) {
            console.log(error.message);
            setLoading(false);
            setError(error)      
        }
    }
     
    useEffect(()=> {
        CatchingThePokemons()
    },[])

    //Search Func
    const searchPokemon = pokemon.filter((currentPokemon)=> 
        currentPokemon.name.toLowerCase().includes(search.toLowerCase())
    )

    if (error) {
        return (
            <div>
              <h1>{error.message}</h1>
            </div>
            )
        }


    if (loading) {
    return (
        <div>
          <h1>Loading.....</h1>
        </div>
        )
    }

  return (
    <section className='container'>
      <header>
        <h1>Pokedex</h1>
      </header>
      <div className='pokemon-search'>
        <input type="text" placeholder='Search Pokemon' value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div>
        <ul className='cards'>
            {searchPokemon.map((curPokemon)=> {
               return (
                <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
               )
            })}
        </ul>
      </div>
    </section> 
  )
}

export default Pokemon
