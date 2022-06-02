import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { EnvCollection } from "src/shared/constants/collections/env.collection";
import { StrategyCollection } from "../constants/strategy.collection";
import { PayloadModel } from "../models/payload.model";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, StrategyCollection.ACCESS_TOKEN_STRATEGY) {
    constructor(
        private readonly _configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _configService.get<string>(EnvCollection.ACCESS_TOKEN_SECRET),
        });
    }

    public async validate(payload: PayloadModel) {
        return { sub: payload.sub, email: payload.email };
    }
}