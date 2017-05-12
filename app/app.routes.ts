import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import CityListComponent from "./city-list.component";
import WeatherComponent from "./weather.component";

const routes: Routes = [
    {path: "weather/:woeId", component: WeatherComponent },
    {path: "", component: CityListComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
