class ClassUserRegister {

    constructor() {
        this.getObjects = this.getObjects();
    }

    getObjects = () => {
        return {
            name: '',
            legalName: '',
            type: 'person',
            email: '',
            phone: '',
            otherPhone: '',
            responsible: '',
            stateRegistration: '',
            birthDate: '',
            password: '',
            confirmPassword: '',
            gender: '',
            policy: false,
            newsletter: false,
            document: '',
            taxFree: false
        }
    }
}

export default ClassUserRegister;