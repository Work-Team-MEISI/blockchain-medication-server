import { AuthGuard } from "@nestjs/passport";
import { StrategyCollection } from "../constants/strategy.collection";

export class RefreshTokenGuard extends AuthGuard(StrategyCollection.REFRESH_TOKEN_STRATEGY) {
    public constructor() {
        super();
    }
}