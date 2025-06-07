import { Injectable } from '@angular/core';
import { City } from "../models/city";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
const APT_BASE_URL = "https://localhost:7147/api/cities";
@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  cities: City[] = [];

  constructor(private httpClient: HttpClient) {
 
  }

  public getCities(): Observable<City[]> {
    let header = new HttpHeaders();
    header= header.append("Authorization", "Bearer mytoken");
    return this.httpClient.get<City[]>(`${APT_BASE_URL}`, { headers: header });
  }

  public postCity(city: City): Observable<City> {
    let header = new HttpHeaders();
    header= header.append("Authorization", "Bearer mytoken");
    return this.httpClient.post<City>(`${APT_BASE_URL}`,city, { headers: header });
  }

  public putCity(city: City): Observable<string> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer mytoken");

    return this.httpClient.put<string>(`${APT_BASE_URL}/${city.cityID}`, city, { headers: headers })
  }

  public deleteCity(cityID: string | null): Observable<string> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer mytoken");

    return this.httpClient.delete<string>(`${APT_BASE_URL}/${cityID}`, { headers: headers })
  }
}