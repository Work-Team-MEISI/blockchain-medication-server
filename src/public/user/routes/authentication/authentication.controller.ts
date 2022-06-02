import { BadRequestException, Body, ConflictException, Controller, ForbiddenException, InternalServerErrorException, NotFoundException, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PublicRoute } from 'src/shared/constants/public.route';
import { CreateResponseModel } from 'src/shared/models/responses/create.response.model';
import { UpdateResponseModel } from 'src/shared/models/responses/update.response.model';
import { UserRoute } from '../../constants/user.route';
import { UserModel } from '../../structs/user.model';
import { AuthenticationRoute } from './constants/authentication.route';
import { SignInDTO } from './dtos/sign-in.dto';
import { SignUpDTO } from './dtos/sign-up.dto';
import * as bcrypt from "bcrypt";
import { AuthenticationService } from './services/authentication.service';
import { TokenModel } from './models/token.model';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvCollection } from 'src/shared/constants/collections/env.collection';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { AccessTokenGuard } from './guards/access-token.guard';
import { GetCurrentUser } from './decorators/get-current-user.decorator';
import { Public } from './decorators/public.decorator';

@Controller(`${PublicRoute.USERS}${UserRoute.AUTHENTICATION}`)
export class AuthenticationController {
    public constructor(
        private readonly _authenticationService: AuthenticationService<UserModel>,
        private readonly _jwtService: JwtService,
        private readonly _configService: ConfigService
    ) { }

    @Public()
    @Post(AuthenticationRoute.SIGN_UP)
    public async signUp(@Body() signUpDTO: SignUpDTO): Promise<CreateResponseModel<UserModel>> {
        signUpDTO.password = await bcrypt.hash(signUpDTO.password, 10);

        const user = await this._authenticationService.fetchOne({ email: signUpDTO.email }).catch((error) => {
            throw new InternalServerErrorException(error);
        });

        if (user !== null && user !== undefined) {
            throw new ConflictException();
        }

        await this._authenticationService.createOne(signUpDTO).catch((error) => {
            throw new InternalServerErrorException(error);
        });

        const createdUser = await this._authenticationService.fetchOne({ email: signUpDTO.email }).catch((error) => {
            throw new InternalServerErrorException(error);
        });

        return new CreateResponseModel<UserModel>(createdUser.userId, null, createdUser);
    }

    @Public()
    @Put(AuthenticationRoute.SIGN_IN)
    public async signIn(@Body() signInDTO: SignInDTO): Promise<UpdateResponseModel<{ user: UserModel, tokens: { accessToken: string, refreshToken: string, } }>> {
        const user = await this._authenticationService.fetchOne({ email: signInDTO.email }).catch((error) => {
            throw new InternalServerErrorException(error);
        });

        if (user === null || user === undefined) {
            throw new NotFoundException();
        }

        const comparePassword = await bcrypt.compare(signInDTO.password, user.password).catch((error) => {
            throw new InternalServerErrorException(error);
        })

        if (comparePassword === false) {
            throw new BadRequestException();
        }

        const tokens = await this._signTokens(user.userId, user.email).catch((error) => {
            throw new InternalServerErrorException(error);
        });

        const hashedToken = await this._hashToken(tokens.refreshToken).catch((error) => {
            throw new InternalServerErrorException(error);
        });

        await this._updateRefreshToken({ email: signInDTO.email }, hashedToken).catch((error) => {
            throw new InternalServerErrorException(error);
        });

        const updatedUser = await this._authenticationService.fetchOne({ email: signInDTO.email }).catch((error) => {
            throw new InternalServerErrorException(error);
        });

        return new UpdateResponseModel<{ user: UserModel, tokens: { accessToken: string, refreshToken: string, } }>(
            updatedUser.userId,
            null,
            null,
            {
                user: updatedUser,
                tokens: { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, }
            });
    }

    @UseGuards(AccessTokenGuard)
    @Put(AuthenticationRoute.SIGN_OUT)
    public async signOut(@GetCurrentUser('sub') userId: string): Promise<UpdateResponseModel<null>> {
        const user = await this._authenticationService.fetchOne({ userId: userId }).catch((error) => {
            throw new InternalServerErrorException(error);
        });

        if (user === null || user === undefined) {
            throw new NotFoundException();
        }

        if (user.hashedRefreshToken === null) {
            throw new BadRequestException();
        }

        await this._authenticationService.updateOne({ userId: user.userId }, { hashedRefreshToken: null }).catch((error) => {
            throw new InternalServerErrorException(error);
        });

        return new UpdateResponseModel<null>(user.userId, null, null, null);
    }

    @Public()
    @UseGuards(RefreshTokenGuard)
    @Put(AuthenticationRoute.REFRESH_TOKEN)
    public async refreshToken(
        @GetCurrentUser('sub') userId: string,
        @GetCurrentUser('refreshToken') refreshToken: string,
    ): Promise<UpdateResponseModel<{ accessToken: string, refreshToken: string }>> {
        const user = await this._authenticationService.fetchOne({ userId: userId }).catch((error) => {
            throw new InternalServerErrorException(error);
        })

        if (user === null || user === undefined) {
            throw new NotFoundException();
        }

        const comparedToken = await bcrypt.compare(refreshToken!, user.hashedRefreshToken!).catch((error) => {
            throw new InternalServerErrorException(error);
        });

        if (comparedToken === false) {
            throw new ForbiddenException();
        }

        const tokens = await this._signTokens(user.userId, user.email).catch((error) => {
            throw new InternalServerErrorException(error);
        });

        const hashedToken = await this._hashToken(tokens.refreshToken).catch((error) => {
            throw new InternalServerErrorException(error);
        });

        await this._updateRefreshToken({ userId: user.userId }, hashedToken).catch((error) => {
            throw new InternalServerErrorException(error);
        });

        return new UpdateResponseModel<{ accessToken: string, refreshToken: string }>(user.userId, null, null, {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        });
    }

    /** Utility Functions */

    private async _signTokens(sub: string, email: string): Promise<TokenModel> {
        const [accessToken, refreshToken] = await Promise.all([
            this._jwtService.signAsync({ sub: sub, email: email }, { secret: this._configService.get<string>(EnvCollection.ACCESS_TOKEN_SECRET), expiresIn: "1d" }).catch((error) => error),
            this._jwtService.signAsync({ sub: sub, email: email }, { secret: this._configService.get<string>(EnvCollection.REFRESH_TOKEN_SECRET), expiresIn: "7d" }).catch((error) => error),
        ]);

        return new TokenModel(accessToken, refreshToken);
    }

    private async _hashToken(refreshToken: string): Promise<string> {
        return await bcrypt.hash(refreshToken, 10).catch((error) => error);
    }

    private async _updateRefreshToken<K>(httpParams: K, hashedRefreshToken: string): Promise<void> {
        return await this._authenticationService.updateOne(httpParams, { hashedRefreshToken: hashedRefreshToken }).catch((error) => error);
    }
}
