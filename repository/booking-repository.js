const { StatusCodes } = require('http-status-codes');
const {Booking} = require('../models/index')
const { ValidationError, AppError } = require('../utils/errors/index');

class BookingRepository{
    async create(data){
        const booking = await Booking.create(data);
        return booking;

    }catch(error){
        if(error.name == 'SequelizeValidationError'){
            throw new ValidationError(error);
        }
        throw new AppError(
            'RepositoryError',
            'Cannot create Booking',
            'there was some issue in creating the booking,please try again later',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
    async update(bookingId,data){
        try{
           const booking = await Booking.findByPk(bookingId);
           if(data.status){
            booking.status = data.status;
           }
           await booking.save();
           return booking;
        }catch(error){
            throw new AppError(
                'RepositoryError',
                'Cannot create Booking',
                'there was some issue in updating the booking,please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }


    }

}

module.exports = BookingRepository;