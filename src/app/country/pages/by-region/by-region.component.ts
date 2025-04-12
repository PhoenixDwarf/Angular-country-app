import { Component, inject, signal } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { Region } from '../../types/regiones.type';
import { NgClass } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-region-page',
  imports: [ListComponent, NgClass],
  templateUrl: './by-region.component.html',
})
export class ByRegionPageComponent {
  regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryService = inject(CountryService);
  selectedRegion = signal<Region>('Africa');

  selectRegion(region: Region) {
    this.selectedRegion.set(region);
  }

  regionResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => this.countryService.searchByRegion(request.region),
  });
}
