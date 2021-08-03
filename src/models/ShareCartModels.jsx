class ClassShareCart {

    constructor() {
        this.getObjects = this.getObjects();
    }

    getObjects = () => {
        return {
            name: '',
            email: '',
            emailTo: '',
            message: ''
        }
    }
}

export default ClassShareCart;