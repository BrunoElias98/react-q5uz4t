class ClassReviews {

    constructor() {
        this.getObjects = this.getObjects();
    }

    getObjects = () => {
        return {
            description: '',
            status: '',
            rating: '',
            recommended: false,
        }
    }

    getRecommendedLabel = (recommended) => {
        return !recommended ? 'Não' : 'Sim';
    }

    getStatusLabel = (status) => {
        return !status ? 'Desativado' : 'Ativado';
    }
}

export default ClassReviews;