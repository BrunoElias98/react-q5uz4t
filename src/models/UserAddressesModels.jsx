class ClassUserAddresses {

    constructor() {
        this.getObjects = this.getObjects();
    }

    getObjects = () => {
        return {
            name: '',
            contact: '',
            zipcode: '',
            street: '',
            number: '',
            complement: '',
            district: '',
            city: '',
            region: ''
        }
    }
}

export default ClassUserAddresses;
