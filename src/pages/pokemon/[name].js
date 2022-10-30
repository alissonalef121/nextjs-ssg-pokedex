import { GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Pokemon({ pokemon }) {
    const { isFallback} = useRouter()

    if (isFallback) {
      return <h1>loading...</h1>
    }

    return (
      <>
        <Image
          src={pokemon.sprites.front_default}
          width={300}
          height={300}
          alt={`${pokemon.species.name} Sprite`}/>
        <h1>{pokemon.species.name}</h1>
        <h2>{pokemon.id}</h2>
        <div>
          {
            pokemon.types.map( type => (
              <div key={type.type.name}>{type.type.name}</div>
            ))
          }
        </div>

        <Link href="/">Return to home</Link>
      </>
    )
}

export const getStaticPaths = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokedex/2`)
  const data = await response.json()

  const paths = data.pokemon_entries.map( pokemon => {
    return {
      params: {
        name: pokemon.pokemon_species.name
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async context => {
  const { name } = context.params

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  const data = await response.json()
  
  return {
    props: {
      pokemon: data
    },
    revalidate: 86400 // 24 hours
  }
}