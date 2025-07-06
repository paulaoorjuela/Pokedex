import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseURL = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  /**
   * Fetches a paginated list of Pokémon with basic info (name and URL).
   * @param limit - Number of Pokémon to fetch per request (default is 50)
   * @param offset - Offset for pagination (e.g., 0 for page 1, 50 for page 2)
   * @returns A Promise that resolves with the API response
   */
  getAll(limit = 50, offset = 0) {
    return firstValueFrom(
      this.http.get<any>(`${this.baseURL}/?limit=${limit}&offset=${offset}`)
    );
  }

  /**
   * Fetches full detail for a Pokémon by its name.
   * @param name - The name of the Pokémon
   * @returns A Promise that resolves with the Pokémon's detailed data
   */
  getByName(name: string) {
    return firstValueFrom(this.http.get<any>(`${this.baseURL}/${name}`));
  }

  /**
   * Given an array of Pokémon (with URLs), fetches full details for each.
   * Uses Promise.all to run all requests in parallel.
   * @param results - An array of Pokémon result objects with URLs
   * @returns A Promise that resolves with an array of detailed Pokémon data
   */
  getDetailsFromList(results: any[]) {
    return Promise.all(
      results.map((p) => firstValueFrom(this.http.get(p.url)))
    );
  }

  /**
   * Fetches all available Pokémon types from the PokéAPI.
   * @returns A Promise that resolves with the list of types
   */
  getAllTypes() {
    return firstValueFrom(this.http.get<any>('https://pokeapi.co/api/v2/type'));
  }
}
