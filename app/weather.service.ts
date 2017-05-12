import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";

interface WeatherApiResponse {
    code: number;
    description: string;
    temp: number;
}

export interface WeatherInformation {
    city: string;
    code: number;
    description: string;
    temperature: number;
}

export interface City {
    name: string;
    imageSrc: string;
    woeId: string;
}

@Injectable()
export class WeatherService {
    cities = [
        {name: "Bogota", imageSrc: "img/bogota.jpg", woeId: "3688689"},
        {name: "Cape Town", imageSrc: "img/cape-town.jpg", woeId: "3369157"},
        {name: "London", imageSrc: "img/london.jpg", woeId: "2643743"},
        {name: "New Delhi", imageSrc: "img/delhi.jpg", woeId: "1273840"},
        {name: "New York", imageSrc: "img/new-york.jpg", woeId: "5128581"},
        {name: "Paris", imageSrc: "img/paris.jpg", woeId: "2988507"},
        {name: "Sydney", imageSrc: "img/sydney.jpg", woeId: "2147714"},
        {name: "Tokyo", imageSrc: "img/tokyo.jpg", woeId: "1850147"},
        {name: "Vancouver", imageSrc: "img/vancouver.jpg", woeId: "6173331"}
    ];

    constructor(private http: Http) {}

    getWeather(woeId: string) {
        const url = this.generateWeatherUrl(woeId);
        return this.http.get(url).toPromise()
            .then(x => {
                const apiResponse = x.json() as WeatherApiResponse;
                const weatherCode = apiResponse.code;
                const weatherDesc = apiResponse.description;
                const weatherTemp = apiResponse.temp;
                return {
                    city: this.getCityName(woeId),
                    code: Number(weatherCode),
                    description: weatherDesc,
                    temperature: Number(weatherTemp)
                } as WeatherInformation;
            });
    }

    private generateWeatherUrl(woeId: string) {
        return `http://localhost:3011/api/weather/${woeId}`;
    }

    private getCityName(woeId: string) {
        const matches = this.cities.filter(x => x.woeId === woeId);
        return matches.length === 1 ? matches[0].name : undefined;
    }
}