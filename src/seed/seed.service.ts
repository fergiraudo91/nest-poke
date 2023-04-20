import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel : Model<Pokemon>
  ){}
  private readonly axios: AxiosInstance = axios;
 async executeSeed(){
  await this.pokemonModel.deleteMany({});
  const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=151');

  const pokemons = data.results.map(pokemon => ({
    name: pokemon.name,
    no: +pokemon.url.split('pokemon')[1].replace(/\//g, '')
  }));

  await this.pokemonModel.insertMany(pokemons);

  return 'Seed Executed';
 }
}
