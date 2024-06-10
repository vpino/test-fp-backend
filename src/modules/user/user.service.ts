import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, DataSource } from 'typeorm';
import { CrudService } from '../../common/services/crud/crud.service';
import { User } from './entities/user.entity';
import { CreateUserAndPersonaDto } from './dtos/create.user.person.dto';
import { ResponseDTO } from '../../common/dtos/response.dto';
import { MailService } from '../../common/services/mail/mail.service';
import { IEmailData } from 'src/common/interfaces/email-data.interface';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { MESSAGES } from 'src/common/constans/messages';
import { UserStatusEnum } from 'src/common/enums/user.enum';
import * as bcrypt from 'bcrypt';
import { PersonaService } from '../persona/persona.service';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly dataSourceInject: DataSource,
    private personaService: PersonaService,
    private mailService: MailService,
    private readonly entityManager: EntityManager,
  ) {
    super(userRepository, 'id', dataSourceInject);
  }

  async createUserAndPersona(data: CreateUserAndPersonaDto): Promise<ResponseDTO> {
    return await this.entityManager.transaction(async transactionalEntityManager => {
      const persona = this.personaService.create(data.persona);
      const savedPersona = await transactionalEntityManager.save(persona);

      if (!savedPersona) {
        throw new BadRequestException(MESSAGES.CREATION_ERROR);
      }

      data.user.persona = savedPersona.id;

      data.user.password = Math.random().toString(36).slice(-8);
      const user = this.userRepository.create(data.user as any);
      const savedUser = await transactionalEntityManager.save(user);

      await this.sendTmpPasswd(data.user.email, data.user.password);

      return { data: savedUser };
    });
  }

  async updateUserAndPersona(id: string, data: CreateUserAndPersonaDto): Promise<ResponseDTO> {
    return await this.entityManager.transaction(async transactionalEntityManager => {
      const persona = await this.personaService.update(
        data.persona.id,
        data.persona,
      );

      if (!persona) {
        throw new BadRequestException(MESSAGES.UPDATE_ERROR);
      }

      const updatedPersona = await transactionalEntityManager.save(persona);

      data.user.persona = updatedPersona.data.id;

      const user = await this.userRepository.update(
        id,
        data.user as any
      );

      if (!user) {
        throw new BadRequestException(MESSAGES.UPDATE_ERROR);
      }

      const updatedUser = await transactionalEntityManager.save(user);

      return { data: updatedUser };
    });
  }

  async deleteUserAndPersona(userId: string): Promise<ResponseDTO> {
    return await this.entityManager.transaction(async transactionalEntityManager => {
      const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['persona'] });

      if (!user) {
        throw new BadRequestException(MESSAGES.USER_NOT_FOUND);
      }

      await transactionalEntityManager.remove(user);
      await this.personaService.deleteOne(user.persona.id);

      return {
        data: { message: 'Usuario y persona eliminados correctamente' },
      };
    });
  }

  async sendTmpPasswd(email: string, passwd: string): Promise<boolean> {
    const emailData: IEmailData = {
      email: email,
      name: email,
      subject: 'CLAVE TEMPORAL DE ACCESO',
      mainMessage: '',
      secondMessage: passwd,
    };

    await this.mailService.sendEmail(emailData);

    return true;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto, email: string): Promise<ResponseDTO> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        throw new BadRequestException(MESSAGES.USER_NOT_FOUND);
      }

      if (!bcrypt.compareSync(resetPasswordDto.oldPassword, user.password)) {
        throw new BadRequestException(MESSAGES.PASSWORD_CHANGED);
      }

      user.password = resetPasswordDto.newPassword;
      user.status = UserStatusEnum.ACTIVE;

      await this.userRepository.save(user);

      return { message: MESSAGES.PASSWORD_UPDATED };
    } catch (error) {
      throw error;
    }
  }
}
