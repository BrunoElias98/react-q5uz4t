class ClassContact {

    constructor() {
        this.getObjects = this.getObjects();
    }

    getObjects = () => {
        return {
            name: '',
            email: '',
            message: '',
            phone: ''
        }
    }
}

export default ClassContact;