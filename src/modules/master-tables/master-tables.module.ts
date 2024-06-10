import { Module } from '@nestjs/common';
import { CountryService } from './services/country/country.service';
import { StateService } from './services/state/state.service';
import { TownshipService } from './services/township/township.service';
import { ParishService } from './services/parish/parish.service';
import { Country } from 'src/common/entities/country.entity';
import { State } from 'src/common/entities/state.entity';
import { Township } from 'src/common/entities/township.entity';
import { Parish } from 'src/common/entities/parish.entity';
import { MasterTablesController } from './master-tables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypeService } from './services/product-type/product-type.service';
import { ProductType } from 'src/common/entities/product-type.entity';

@Module({
  providers: [
    CountryService,
    StateService,
    TownshipService,
    ParishService,
    ProductTypeService,
  ],
  exports: [
    CountryService,
    StateService,
    TownshipService,
    ParishService,
    ProductTypeService,
  ],
  imports: [
    TypeOrmModule.forFeature([Country, State, Township, Parish, ProductType]),
  ],
  controllers: [MasterTablesController],
})
export class MasterTablesModule {}
