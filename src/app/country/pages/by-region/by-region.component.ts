import { Component, inject, linkedSignal, signal } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { Region } from '../../types/regiones.type';
import { NgClass } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  imports: [ListComponent, NgClass],
  templateUrl: './by-region.component.html',
})
export class ByRegionPageComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get(
    'region'
  ) as Region;

  countryService = inject(CountryService);
  selectedRegion = linkedSignal<Region>(() => this.queryParam ?? 'Africa');

  regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  selectRegion(region: Region) {
    this.selectedRegion.set(region);
  }

  regionResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.region) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: { region: request.region },
      });

      return this.countryService.searchByRegion(request.region);
    },
  });
}
