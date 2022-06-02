export class PayloadModel {
    public readonly sub: string;
    public readonly email: string;
    public readonly iat: string;
    public readonly exp: string;
    public readonly refreshToken?: string;
}