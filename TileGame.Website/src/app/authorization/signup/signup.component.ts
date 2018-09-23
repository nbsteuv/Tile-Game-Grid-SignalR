import { Component } from '@angular/core';

import { UserService } from '../../_shared/services';
import { User } from '../../_shared/types';

@Component({
	templateUrl: './signup.component.html'
})
export class SignupComponent {
	user: User = new User();
	passwordMismatch = false;
	requiredFieldsFail = false;
	accountCreationFailMessage = '';

	constructor(private userService: UserService) {}

	createAccount() {
		// TODO: Validate password and email

		this.clearErrorMessages();

		if (!this.user.username || !this.user.email || !this.user.password || !this.user.password2) {
			this.requiredFieldsFail = true;
			return;
		}

		if (this.user.password !== this.user.password2) {
			this.passwordMismatch = true;
			return;
		}

		this.userService.register(this.user).subscribe(
			(data) => {
				console.log('Account creation success.');
			},
			(err) => {
				this.accountCreationFailMessage = 'Account creation failed.';
			}
		);
	}

	clearErrorMessages(): void {
		this.accountCreationFailMessage = '';
		this.passwordMismatch = false;
		this.requiredFieldsFail = false;
	}
}
