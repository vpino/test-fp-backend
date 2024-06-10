import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Types } from 'mongoose';
import { MESSAGES } from 'src/common/constans/messages';
import { Parish } from 'src/common/entities/parish.entity';
import { CrudService } from 'src/common/services/crud/crud.service';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ParishService extends CrudService<Parish> {
  constructor(
    @InjectRepository(Parish) private parishRepository: Repository<Parish>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(parishRepository, 'id', dataSourceInject);
  }

  async getParishesByTownship(township: string) {
    try {
      const parishes = await this.getAll({
        filter: { township: new Types.ObjectId(township) },
      });

      if (!parishes || !parishes.data) {
        throw new HttpException(MESSAGES.QUERY_ERROR, HttpStatus.BAD_REQUEST);
      }

      return parishes;
    } catch (error) {
      throw error;
    }
  }
}
