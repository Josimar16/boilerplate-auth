import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ICreatePermissionDTO } from '../../dtos/ICreatePermissionDTO';
import { IPermissionsRepository } from '../../repositories/IPermissionsRepository';
import { IPermissionModel } from '../../repositories/models/IPermissionModel';

@Injectable()
export class CreatePermissionUseCase {
  constructor(
    @Inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository
  ) { }

  public async execute({ name, description }: ICreatePermissionDTO): Promise<IPermissionModel> {
    const permissionAlreadyExists = await this.permissionsRepository.findByName(name);
    if (permissionAlreadyExists) {
      throw new BadRequestException("Permissão ja existe.")
    }
    const permission = await this.permissionsRepository.create({
      name, description
    });
    return permission;
  }
}
