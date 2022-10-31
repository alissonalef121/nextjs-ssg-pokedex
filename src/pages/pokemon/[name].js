import { GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Pokemon({ pokemon, prevPokemon, nextPokemon }) {
    const { isFallback} = useRouter()

    if (isFallback) {
      return <h1 className='text-violet-500 font-bold text-3xl'>loading...</h1>
    }

    return (
      <>
        <div className='h-screen w-screen flex items-center justify-center'>
          <div className='poke-card text-center bg-gray-200 rounded-xl p-5'>
            <Image
              src={pokemon.sprites.front_default}
              width={300}
              height={300}
              alt={`${pokemon.species.name} Sprite`}/>
            
            <div className='flex gap-3 justify-center'>
              <h1 className='text-violet-500 font-bold text-3xl'>{pokemon.species.name}</h1>
              <h2 className='text-violet-500 font-medium text-3xl'>({pokemon.id})</h2>
            </div>

            <div className='flex gap-2 flex-wrap justify-center m-2'>
              {
                pokemon.types.map( type => (
                  <div key={type.type.name} className={`rounded py-px px-3 bg-${type.type.name} bg-opacity-10 border-2 border-${type.type.name} text-${type.type.name}`}>{type.type.name}</div>
                ))
              }
            </div>

            <div className='flex flex-wrap justify-center gap-2 m-5'>
              <Link href={prevPokemon.species.name}>
                <a className='rounded py-px px-3 bg-violet-200 text-violet-500'>
                  <span>
                    <span>{prevPokemon.id} </span>
                    <span>{prevPokemon.species.name}</span>
                  </span>
                </a>
              </Link>
              <Link href={nextPokemon.species.name}>
                <a className='rounded py-px px-3 bg-violet-200 text-violet-500'>
                  <span>
                    <span>{nextPokemon.id} </span>
                    <span>{nextPokemon.species.name}</span>
                  </span>
                </a>
              </Link>
            </div>

            <Link href="/" className='text-violet-500'>
              <a className='underline'>Return to home</a>
            </Link>
          </div>
        </div>
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

  const prevPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.id === 1 ? data.id : data.id-1}`)
  const dataPrevPokemon = await prevPokemon.json()

  const nextPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.id+1}`)
  const dataNextPokemon = await nextPokemon.json()
  
  return {
    props: {
      pokemon: data,
      prevPokemon: dataPrevPokemon,
      nextPokemon: dataNextPokemon
    },
    revalidate: 86400 // 24 hours
  }
}