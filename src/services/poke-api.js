export default class PokemonService {
  _apiBase = 'https://pokeapi.co/api/v2'

  fakeData = [
    {
      name: 'ivysaur',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/2.png',
    },
    {
      name: 'venusaur',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/3.png',
    },
    {
      name: 'charmander',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/4.png',
    },
    {
      name: 'charmeleon',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/5.png',
    },
    {
      name: 'charizard',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/6.png',
    },
    {
      name: 'squirtle',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/7.png',
    },
    {
      name: 'wartortle',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/8.png',
    },
    {
      name: 'blastoise',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/9.png',
    },
    {
      name: 'caterpie',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10.png',
    },
    {
      name: 'metapod',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/11.png',
    },
  ]

  _extractId(url) {
    const idRegExp = /\/([0-9]*)\/$/;
    return url.match(idRegExp)[1];
  }

  getFakeData = () => this.fakeData

  getResourse = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`${url}, received status ${res.status}`);
    }

    const body = await res.json();
    return body;
  }

  getPokemonsList = async (limit = 200) => {
    const body = await this.getResourse(`/pokemon/?limit=${limit}`);
    const names = body.results;
    return names;
  }

  getPokemonImage = async (name) => {
    const res = await this.getResourse(`/pokemon-form/${name}`);
    const imageUrl = res.sprites.front_shiny;
    return imageUrl;
  }

  getPokemonDetails = async (name) => {
    const basicDetails = await this.getResourse(`/pokemon/${name}`);
    const image = await this.getPokemonImage(name);

    const {
      height,
      weight,
      id,
      base_experience: experience,
      name: pokemonName,
    } = basicDetails;

    let evolves = false;
    const chain = await this.getEvolutionChain(id);

    if (chain[chain.length - 1] !== pokemonName) {
      const idx = chain.findIndex(item => item === pokemonName);
      const nextSpecies = chain[idx + 1];
      const imageSpecies = await this.getPokemonImage(nextSpecies);
      evolves = [nextSpecies, imageSpecies];
    }

    return {
      name: pokemonName,
      experience,
      id,
      height: height * 10,
      weight: weight / 10,
      image,
      evolves,
    };
  }

  getEvolutionChain = async (pokemonId) => {
    const species = await this.getResourse(`/pokemon-species/${pokemonId}`);
    const {
      evolution_chain: { url },
    } = species;
    const evolutionId = this._extractId(url);

    const evolution = await this.getResourse(`/evolution-chain/${evolutionId}`);
    const evolutionChain = [];

    if (evolution.chain.species) {
      evolutionChain.push(evolution.chain.species.name);

      if (evolution.chain.evolves_to[0] !== undefined) {
        evolutionChain.push(evolution.chain.evolves_to[0].species.name);

        if (evolution.chain.evolves_to[0].evolves_to[0] !== undefined) {
          evolutionChain.push(
            evolution.chain.evolves_to[0].evolves_to[0].species.name,
          );
        }
      }
    }
    return evolutionChain;
  }

  getAbilitiesNamesList = async () => {
    const data = await this.getResourse('/ability/?limit=70');
    const abilitiesNames = [];
    const result = [];

    for (const item of data.results) {
      abilitiesNames.push(item.name);
    }

    for (let i = 0; i < abilitiesNames.length; i += 1) {
      result[i] = await this.getAbilityDetail(abilitiesNames[i]);
    }

    return result;
  }

  getAbilityDetail = async (abilityName) => {
    const data = await this.getResourse(`/ability/${abilityName}`);

    const description = data.effect_entries[0].effect;
    const name = data.name;
    return { description, name };
  }
}
