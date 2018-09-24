import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ MenuComponent ],
				imports: [ FormsModule ]
			});
		})
	);

	it('should exist', () => {
		const fixture = TestBed.createComponent(MenuComponent);
		expect(fixture.debugElement.componentInstance).toBeTruthy();
	});
});
