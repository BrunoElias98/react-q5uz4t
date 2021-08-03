class ClassRecoverPassword {

    constructor() {
        this.getObjects = this.getObjects();
    }

    getObjects = () => {
        return {
            password: '',
            confirmPassword: '',
        }
    }
}

export default ClassRecoverPassword;