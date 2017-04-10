import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import CityListComponent from "./city-list.component";
import WeatherComponent from "./weather.component";

const routes: Routes = [
    {path: "weather/:woeId", component: WeatherComponent },
    {path: "cities", component: CityListComponent },
    {path: "", redirectTo: "/cities", pathMatch: "full" }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
