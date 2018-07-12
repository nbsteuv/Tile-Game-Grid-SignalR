export class User {
    constructor(
        public username?: string,
        public email?: string,
        public password?: string,
        public password2?: string,
        public rememberMe?: boolean
    ) { }
}
