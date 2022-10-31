import Link from 'next/link'
import { GetStaticProps } from 'react'

export default function Home({ pokemons }) {
  return (
    <>
      <h1 className='text-violet-500 font-bold text-3xl'>Pokedex using static site generation</h1>
      <ul className='grid gap-3 grid-cols-4 lg:grid-cols-12 mt-5'>
        {
          pokemons.pokemon_entries.map( pokemon => (
            <li className='bg-gray-300 rounded px-3 py-1 text-gray-700 font-medium' key={pokemon.pokemon_species.name}>
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