class ClassUserLoginSecurity {

    constructor() {
        this.getObjects = this.getObjects();
    }

    getObjects = () => {
        return {
            name: '',
            document: '',
            type: '',
            phone: '',
            password: null
        }
    }
}

export default ClassUserLoginSecurity;
