import Link from 'next/link'
import { GetStaticProps } from 'react'

export default function Home({ pokemons }) {
  return (
    <>
      <h1>Pokedex using static site generation</h1>
      <ul>
        {
          pokemons.pokemon_entries.map( pokemon => (
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

export const getStaticProps = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokedex/2')
  const data = await response.json()

  return {
    props: {
      pokemons: data,
    }
  }
}