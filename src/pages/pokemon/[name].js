import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'


export default function Pokemon({ pokemon }) {
    const { isFallBack } = useRouter()

    if(isFallBack) {
      return (
        <h1>Loading...</h1>
      )
    }

    return (
      <>
        <img src={pokemon.sprites.front_default} />
        <h1>{pokemon.species.name}</h1>
      </>
    )
}

export const getStaticPaths = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokedex/2`)
  const data = await response.json()

  const paths = data.pokemon_entries.map( pokemon => {
    return { params: { name: pokemon.pokemon_species.name } }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const { name } = context.params

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  const data = await response.json()

  return {
    props: {
      pokemon: data,
    }
  }
}