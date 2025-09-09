import mongoose from "mongoose";

const donateSchema = new mongoose.Schema(
    {
        name : {type: String, required : true},
        quantity : {type: Number, required: true}
    }
);


const Donate = mongoose.model('Donate', donateSchema);

export default Donate;