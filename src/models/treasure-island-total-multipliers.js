import mongoose from "mongoose";

const modelName = "TreasureIsland_multiplier";
const totalMultiplier = new mongoose.Schema({
    uid: { type: String },
    playerId: { type: String },
    name: { type: String, required: true },
    ended: { type: Boolean, default: false },
    time: { type: Date },
    endTime: { type: Date },
    rounds: { type: [RoundTotalMultiplierSchema] },
});

export default mongoose.model(modelName, totalMultiplier);
