import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy, ExtractJwt } from "passport-jwt";
import { EnvCollection } from "src/shared/constants/collections/env.collection";
import { StrategyCollection } from "../constants/strategy.collection";
import { PayloadModel } from "../models/payload.model";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, StrategyCollection.REFRESH_TOKEN_STRATEGY) {
    constructor(
        private readonly _configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _configService.get<string>(EnvCollection.REFRESH_TOKEN_SECRET),
            passReqToCallback: true,
        });
    }

    public async validate(_req: Request, payload: PayloadModel) {
        const authHeader = _req.get("authorization");

        if (authHeader === undefined) {
            throw new ForbiddenException();
        }

        const refreshToken = authHeader.replace("Bearer", "").trim();

        return { ...payload, refreshToken };
    }
}