export default class PokemonService {
  _apiBase = 'https://pokeapi.co/api/v2'

  _extractId(url) {
    const idRegExp = /\/([0-9]*)\/$/;
    return url.match(idRegExp)[1];
  }

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
}
