import mongoose from "mongoose";
import { Models } from "sc-slot-game-base";

//TODO confirm we have fame?
export default mongoose.model("TreasureIsland_fame", Models.HallOfFamesSchema);
