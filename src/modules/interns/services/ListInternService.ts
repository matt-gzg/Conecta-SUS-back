import Intern from "../typeorm/entities/Intern";
import { InternsRepository } from "../typeorm/repositories/InternsRepository";

export default class ListInternService {
    public async execute(): Promise<Intern[]> {
        const interns = await InternsRepository.find();
        return interns;
    }
}