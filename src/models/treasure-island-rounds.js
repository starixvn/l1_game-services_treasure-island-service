import mongoose from "mongoose";
import { Models } from "sc-cascading-slot-base";

const modelName = "TreasureIsland_round";
const roundSchema = Models.RoundsSchema;

export default mongoose.model(modelName, roundSchema);
