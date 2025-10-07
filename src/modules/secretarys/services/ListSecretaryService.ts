import Secretary from "../typeorm/entities/Secretary";
import { SecretarysRepository } from "../typeorm/repositories/SecretarysRepository";

export default class ListSecretaryService {
    public async execute(): Promise<Secretary[]> {
        const secretarys = await SecretarysRepository.find();
        return secretarys;
    }
}