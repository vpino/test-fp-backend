import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MESSAGES } from 'src/common/constans/messages';
import { Township } from 'src/common/entities/township.entity';
import { CrudService } from 'src/common/services/crud/crud.service';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TownshipService extends CrudService<Township> {
  constructor(
    @InjectRepository(Township)
    private townshipRepository: Repository<Township>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(townshipRepository, 'id', dataSourceInject);
  }

  async getTownshipByState(state: string) {
    try {
      const townships = await this.getAll({
        filter: { state },
      });

      if (!townships || !townships.data) {
        throw new HttpException(MESSAGES.QUERY_ERROR, HttpStatus.BAD_REQUEST);
      }

      return townships;
    } catch (error) {
      throw error;
    }
  }
}
