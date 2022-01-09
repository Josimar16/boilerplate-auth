import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ICreateRoleDTO } from '../../dtos/ICreateRoleDTO';
import { IRolesRepository } from '../../repositories/IRolesRepository';
import { IRoleModel } from '../../repositories/models/IRoleModel';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    @Inject('RolesRepository')
    private rolesRepository: IRolesRepository
  ) { }

  public async execute({ name, description }: ICreateRoleDTO): Promise<IRoleModel> {
    const roleAlreadyExists = await this.rolesRepository.findByName(name);
    if (roleAlreadyExists) {
      throw new BadRequestException({
        title: 'Falha ao cadastrar!',
        message: 'Cargo já existe!',
        data: null,
        cod: 'bad.request'
      });
    }
    const role = await this.rolesRepository.create({
      name, description
    });
    return role;
  }
}
