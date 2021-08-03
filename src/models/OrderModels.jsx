class ClassOrder {

    constructor(data) {
        this.data = data;
        this.getObjects = this.getObjects();

        this.transactionMethods = {
            pagseguroBillet: {
                name: 'Boleto',
                type: 'billet',
            },
            pagseguroCreditCard: {
                name: 'Cartão de Crédito',
                type: 'creditCard',
            }
        }

        this.statusLabels = {
            new: "Novo",
            pending: "Pendente",
            refunded: "Reembolsado",
            canceled: "Cancelado",
            processing: "Aprovado",
            shipped: "Enviado",
            completed: "Finalizado"
        }
    }

    setData(data) {
        this.data = data;
    }

    getObjects = () => {
        return {
        }
    }

    canCancel = () => {
        let status = ['canceled','completed'];
        if(status.indexOf(this.data.status) >= 0) {
            return false;
        }
        return true;
    }

    canApprove = () => {
        if(this.data.status === 'pending') {
            return true;
        }
        return false;
    }

    canInvoice = () => {
        // if(this.data.status !== 'pending') {
        //     return true;
        // }
        return false;
    }

    canShip = () => {
        if(this.data.status === 'processing') {
            return true;
        }
        return false;
    }

    canComplete = () => {
        if(this.data.status === 'shipped') {
            return true;
        }
        return false;
    }

    getStatusLabel = () => {
        let status = this.data.status;
        return this.statusLabels[status];
    }

    getShipmentLabel = () => {
        return this.data.shipment.description;
    }

    getTransactionLabel = () => {
        let method = this.data.transaction.method;
        return this.transactionMethods[method].name;
    }

    getTransactionType = () => {
        let method = this.data.transaction.method;
        return this.transactionMethods[method].type;
    }

}

export default ClassOrder;