const {BookingRepository} = require('../repository/index');
const { ServiceError } = require('../utils/errors');
const {FLIGHT_SERVICE_PATH} = require('../config/serverConfig');
const { default: axios } = require('axios');

class BookingService{
    constructor(){
        this.bookingRepository = new BookingRepository();
    }
    async createBooking(data){
        try{
            const flightId = data.flightId;
            let getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightRequestURL);
            const flightData = response.data.data;
            let priceOftheflight= flightData.price;
            if(data.noOfSeats > flightData.totalSeats){
                throw new ServiceError('something went wrong in the booking process','Insufficient Seats in the flight')
            }
            const totalCost = priceOftheflight * data.noOfSeats;
            const bookingPayload = {...data,totalCost};
            const booking = await this.bookingRepository.create(bookingPayload);
            const udateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            console.log(udateFlightRequestURL,data)
            await axios.patch(udateFlightRequestURL,{totalSeats: flightData.totalSeats - booking.noOfSeats});
            const finalbooking = this.bookingRepository.update(booking.id,{status:"Booked"});
            return finalbooking;
        }catch(error){
            if(error.name =='RepositoryError'|| error.name == 'validationError'){
                throw error;
            }

            throw new ServiceError();
        }
    }
}

module.exports = BookingService;
