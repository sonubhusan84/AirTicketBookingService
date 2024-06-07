const {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} = 'http-status-codes';

class ServiceError extends Error{
    constructor(
        message = 'Something Went Wrong',
        explanation = 'Service layer error',
        statusCodes = StatusCodes.INTERNAL_SERVER_ERROR
    ){
        super();
        this.message = message;
        this.explanation = explanation;
        this.statusCodes = statusCodes;
    }
}

module.exports = ServiceError;