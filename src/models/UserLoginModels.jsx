class ClassUserLogin {

    constructor() {
        this.getObjects = this.getObjects();
    }

    getObjects = () => {
        return {
            email: '',
            password: '',
            recoverPassword: '',
        }
    }
}

export default ClassUserLogin;