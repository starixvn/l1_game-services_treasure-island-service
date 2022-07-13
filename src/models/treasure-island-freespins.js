import mongoose from "mongoose";
import { Models } from "sc-cascading-slot-base";

const modelName = "TreasureIsland_freespin";
const freeSpinSchema = Models.FreeSpinSchema;

export default mongoose.model(modelName, freeSpinSchema);
