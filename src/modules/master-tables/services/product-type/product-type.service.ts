import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductType } from 'src/common/entities/product-type.entity';
import { CrudService } from 'src/common/services/crud/crud.service';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProductTypeService extends CrudService<ProductType> {
  constructor(
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(productTypeRepository, 'id', dataSourceInject);
  }
}
