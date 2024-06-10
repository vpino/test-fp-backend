import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MESSAGES } from 'src/common/constans/messages';
import { State } from 'src/common/entities/state.entity';
import { CrudService } from 'src/common/services/crud/crud.service';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class StateService extends CrudService<State> {
  constructor(
    @InjectRepository(State) private stateRepository: Repository<State>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(stateRepository, 'id', dataSourceInject);
  }

  async getStatesByCountry(country: string) {
    try {
      const states = await this.getAll({
        filter: { country },
      });

      if (!states || !states.data) {
        throw new HttpException(MESSAGES.QUERY_ERROR, HttpStatus.BAD_REQUEST);
      }

      return states;
    } catch (error) {
      throw error;
    }
  }
}
