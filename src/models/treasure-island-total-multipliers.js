import mongoose from "mongoose";
import { Models } from "sc-cascading-slot-base";

const modelName = "TreasureIsland_multiplier";
const totalMultiplier = Models.TotalMultiplierSchema;

export default mongoose.model(modelName, totalMultiplier);
