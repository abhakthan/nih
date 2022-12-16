import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { BackendService } from './backend.service';

describe('BackendService', () => {
  let service: BackendService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new BackendService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return users', () => {
    httpClientSpy.get.and.returnValue(of([]));

    service.getUsers().subscribe((data: any) => {
      expect(data.length).toEqual(0);
    })

  });
});
