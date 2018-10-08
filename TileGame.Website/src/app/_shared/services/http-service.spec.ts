import { TestBed, async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';

import { HttpService } from './http-service';

import { environment } from '../../../environments/environment';

describe('HttpService', () => {
	const mockHttpClient = jasmine.createSpyObj([ 'get', 'post' ]);
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				providers: [ HttpService, { provide: HttpClient, useValue: mockHttpClient } ]
			});
		})
	);

	it('should exist', () => {
		const httpService = TestBed.get(HttpService);
		expect(httpService).toBeTruthy();
	});

	it('should call httpClient GET with correct URL', () => {
		// Arrange
		mockHttpClient.get.and.returnValue(of(true));
		const httpService = TestBed.get(HttpService);
		const testUrl = '/test';

		// Act
		httpService.get(testUrl);

		// Assert
		const expectedUrl = environment.baseUrl + testUrl;
		const expectedOptions = {
			withCredentials: true
		};
		expect(mockHttpClient.get).toHaveBeenCalledWith(expectedUrl, expectedOptions);
	});

	it('should call httpClient POST with correct URL and body', () => {
		// Arrange
		mockHttpClient.post.and.returnValue(of(true));
		const httpService = TestBed.get(HttpService);
		const testUrl = '/test';
		const testBody = { testProp: 'testValue' };

		// Act
		httpService.post(testUrl, testBody);

		// Assert
		const expectedUrl = environment.baseUrl + testUrl;
		const expectedOptions = {
			withCredentials: true
		};
		expect(mockHttpClient.post).toHaveBeenCalledWith(expectedUrl, testBody, expectedOptions);
	});
});
