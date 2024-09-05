import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import {
  Repository,
  FindManyOptions,
  DeepPartial,
  FindOptionsOrder,
  FindOptionsSelect,
  DataSource,
} from 'typeorm';
import { ResponseDTO } from '../../dtos/response.dto';
import { ParamsDTO } from '../../dtos/params.dto';
import { MESSAGES } from '../../constans/messages';

@Injectable()
export class CrudService<T> {
  constructor(
    protected readonly repository: Repository<T>,
    private readonly key: string = 'id',
    public dataSource: DataSource,
  ) {}

  async count(filter: any = {}): Promise<number> {
    try {
      return await this.repository.count({ where: filter });
    } catch (error) {
      console.error(error, 'count error crud');
      throw new Error(`error: ${error}`);
    }
  }

  async getAll(params: ParamsDTO<T>): Promise<ResponseDTO> {
    try {
      const options: FindManyOptions<T> = {
        where: params.filter,
        order: params.sort as FindOptionsOrder<T>,
        skip: params.skip,
        take: params.limit,
        select: this.mapSelectFields(params.fieldSelected) ?? undefined,
        relations: params.relations,
      };

      let count = 0;
      if (params.limit > 0) {
        count = await this.count(params.filter);
      }

      const cleanedOptions = this.cleanOptions(options);

      const data = await this.repository.find(cleanedOptions);
      return { data, count, skip: +params.skip, limit: +params.limit };
    } catch (error) {
      console.error(error, 'getAll error crud');
      throw new BadRequestException(MESSAGES.QUERY_ERROR);
    }
  }

  async findOne(
    data: any,
    fieldSelected?: Record<string, boolean>,
    relations: string[] = [],
  ): Promise<ResponseDTO> {
    try {
      const options: FindManyOptions<T> = {
        where: data,
        order: data.sort as FindOptionsOrder<T>,
        select: this.mapSelectFields(fieldSelected as any) ?? undefined,
        relations
      };

      const cleanedOptions = this.cleanOptions(options);

      const response = await this.repository.findOne(cleanedOptions);

      return { data: response };
    } catch (error) {
      throw error;
    }
  }

  async create(data: DeepPartial<T>, validation?: any): Promise<T> {
    if (validation) {
      const instance = await this.repository.findOne({ where: validation });
      if (instance) {
        if (instance['deleted'] !== undefined && !instance['deleted']) {
          throw new ConflictException(MESSAGES.DUPLICATED_ERROR);
        }
        return (
          await this.update(instance[this.key], { ...data, deleted: false })
        ).data as T;
      }
    }

    try {
      return await this.repository.save(data);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(MESSAGES.DUPLICATED_ERROR);
      }
      throw new BadRequestException(MESSAGES.CREATION_ERROR);
    }
  }

  async update(
    id: string,
    data: DeepPartial<T>,
    validation?: any,
  ): Promise<ResponseDTO> {
    const filter = { [this.key]: id };
    if (validation) {
      validation[this.key] = { $ne: id };
      const instance = await this.repository.findOne({ where: validation });
      if (instance) {
        throw new ConflictException(MESSAGES.DUPLICATED_ERROR);
      }
    }

    try {
      const instance = await this.repository.preload({ ...filter, ...data });
      if (!instance) {
        throw new BadRequestException(MESSAGES.UPDATE_ERROR);
      }
      await this.repository.save(instance);
      return { data: instance };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(MESSAGES.DUPLICATED_ERROR);
      }
      throw new BadRequestException(MESSAGES.UPDATE_ERROR);
    }
  }

  async deleteOne(params: any): Promise<ResponseDTO> {
    try {
      const result = await this.repository.delete(params);
      return { data: result };
    } catch (error) {
      throw new BadRequestException(MESSAGES.UPDATE_ERROR);
    }
  }

  private mapSelectFields(fields: (keyof T)[]): FindOptionsSelect<T> {
    if (!fields) return {} as FindOptionsSelect<T>;
    return fields.reduce((acc, field) => {
      (acc as any)[field] = true;
      return acc;
    }, {} as FindOptionsSelect<T>);
  }

  async createTransactional(
    data: DeepPartial<T>,
    validation?: any,
  ): Promise<T> {
    const entityManager = this.dataSource.manager;
    const queryRunner = entityManager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const createdEntity = await this.create(data, validation);

      await queryRunner.commitTransaction();

      return createdEntity;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  cleanOptions<T>(obj: T): T {
    const cleanedObject = Object.entries(obj).reduce((acc, [key, value]) => {
      if (value === undefined || value === '' || (typeof value === 'object' && value !== null && !Array.isArray(value) && Object.keys(value).length === 0)) {
        return acc;
      }

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        acc[key] = this.cleanOptions(value);
      } else {
        acc[key] = value;
      }

      return acc;
    }, {} as T);

    return cleanedObject;
  }
}
