import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'src/common/entities/country.entity';
import { CrudService } from 'src/common/services/crud/crud.service';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CountryService extends CrudService<Country> {
  constructor(
    @InjectRepository(Country) private countryRepository: Repository<Country>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(countryRepository, 'id', dataSourceInject);
  }
}
