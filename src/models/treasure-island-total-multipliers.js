import mongoose from "mongoose";

const modelName = "TreasureIsland_multiplier";
const roundTotalMultiplierSchema = new mongoose.Schema(
    {
        time: { type: Date },
        roundId: { type: Number },
        prevTotalMultiplier: { type: Number, default: 0 },
        totalMultiplier: { type: Number, default: 0 },
        multiplier: { type: Number, default: 0 },
    },
    { _id: false }
);

const totalMultiplier = new mongoose.Schema({
    uid: { type: String },
    playerId: { type: String },
    name: { type: String, required: true },
    ended: { type: Boolean, default: false },
    time: { type: Date },
    endTime: { type: Date },
    rounds: { type: [roundTotalMultiplierSchema] },
});

export default mongoose.model(modelName, totalMultiplier);
