export class CreateRecipeDTO {
    public readonly citizenId: string;
    public readonly userId: string;
    public readonly medications: Array<string>;
    public readonly createdAt: string;
}