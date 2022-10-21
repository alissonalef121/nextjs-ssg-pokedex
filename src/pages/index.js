import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {

  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokedex/2')
    .then( res => res.json())
    .then( data => {
      if(!data) {
        console.error(data)
      }
      
      setPokemons(data.pokemon_entries)
    })
  }, [])

  return (
    <>
      <ul>
        {
          pokemons.map( pokemon => (
            <li key={pokemon.pokemon_species.name}>
              <Link href={`/pokemon/${pokemon.pokemon_species.name}`}>
                  <a><span>{pokemon.pokemon_species.name}</span></a>
              </Link>
            </li>
          ))
        }
      </ul>
    </>
  )
}