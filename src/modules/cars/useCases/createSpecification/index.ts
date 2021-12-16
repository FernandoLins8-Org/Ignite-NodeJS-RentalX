import SpecificationsRepository from '../../repositories/implementations/SpecificationsRepository';
import CreateSpecificationController from './CreateSpecificationController';
import CreateSpecificationUseCase from './CreateSpecificationUseCase';

const specificationRepository = SpecificationsRepository.getInstance();

const specificationUseCase = new CreateSpecificationUseCase(specificationRepository);

const specificationController = new CreateSpecificationController(specificationUseCase);

export default specificationController;
