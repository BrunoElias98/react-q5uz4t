class ClassCreditCard {

    constructor() {
        this.getObjects = this.getObjects();
    }

    getObjects = () => {
        return {
            numberCreditCard: '',
            nameCreditCard: '',
            codeSecurity: '',
            document: '',
            // expirationMonth: '',
            // expirationYear: '',
            expirationDate: '',
            brand: null,
            cardToken: '',
            creditCardToken: '',
            dateOfBirth: '',
            installment: '',
        }
    }
}

export default ClassCreditCard;