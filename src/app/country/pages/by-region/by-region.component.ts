import { Component, inject, linkedSignal, signal } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { Region } from '../../types/regiones.type';
import { NgClass } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

function validateQueryParam(queryParam: string): Region {
  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };

  return validRegions[queryParam.toLowerCase()] || 'Africa';
}

@Component({
  selector: 'app-by-region-page',
  imports: [ListComponent, NgClass],
  templateUrl: './by-region.component.html',
})
export class ByRegionPageComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

  countryService = inject(CountryService);
  selectedRegion = linkedSignal<Region>(() =>
    validateQueryParam(this.queryParam)
  );

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
