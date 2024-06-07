const { StatusCodes } = require("http-status-codes");
const {BookingService} = require("../services/index");


const bookingService = new BookingService();

const create = async(req,res) =>{
    try{
        const response = await bookingService.createBooking(req.body);
        return res.status(201).json({
            message:'successfully created te booking',
            success:true,
            err:{},
            data: response
        }) 
    }catch(error){
        return res.status(500).json({
            message:error.message,
            success:false,
            err: error.explanation,
            data: {}
        }) 
    }
}

module.exports = {
    create
}