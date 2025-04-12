import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map(CountryMapper.mapRestCountryArrayToCountryArray),
      catchError((err) => {
        console.log('Error fetching ', err);
        return throwError(
          () =>
            new Error(
              `No se encontro un pais por capital con el termino "${query}"`
            )
        );
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map(CountryMapper.mapRestCountryArrayToCountryArray),
      catchError((err) => {
        console.log('Error fetching ', err);
        return throwError(
          () =>
            new Error(
              `No se encontro un pais por nombre con el termino "${query}"`
            )
        );
      })
    );
  }

  searchCountryByAlphaCode(code: string) {
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map(CountryMapper.mapRestCountryArrayToCountryArray),
      map((countries) => countries.at(0)),
      catchError((err) => {
        console.log('Error fetching ', err);
        return throwError(
          () => new Error(`No se encontro un pais con el código "${code}"`)
        );
      })
    );
  }
}
