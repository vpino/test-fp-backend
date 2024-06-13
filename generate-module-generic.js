const fs = require('fs');
const path = require('path');

// Helper function to capitalize the first letter of a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// EXAMPLE
// const moduleName = 'employment-information';
// const capitalizeName = 'EmploymentInformation';
// const camelCase = 'employmentInformation';

// EXAMPLE 2
// const moduleName = 'ofac';
// const capitalizeName = 'Ofac';
// const camelCase = 'ofac';
// const rootDirectory = './src/modules';

const moduleName = 'bridge-loan';
const capitalizeName = 'BridgeLoan';
const camelCase = 'bridgeLoan';
const rootDirectory = './src/modules';

const json = {
  bridgeLoan: {
    leadUuid: 'NONE',
  },
};

// Directories to create
const directories = [
  `${rootDirectory}/${moduleName}`,
  `${rootDirectory}/${moduleName}/dtos`,
  `${rootDirectory}/${moduleName}/entities`,
  `${rootDirectory}/${moduleName}/interfaces`,
];

// Files to create
const files = {
  // Controller spec file
  [`${rootDirectory}/${moduleName}/${moduleName}.controller.spec.ts`]: `
import { Test, TestingModule } from '@nestjs/testing';
import { ${capitalizeName}Controller } from './${moduleName}.controller';
import { ${capitalizeName}Service } from './${moduleName}.service';

describe('${capitalizeName}Controller', () => {
  let controller: ${capitalizeName}Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [${capitalizeName}Controller],
      providers: [${capitalizeName}Service],
    }).compile();

    controller = module.get<${capitalizeName}Controller>(${capitalizeName}Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
`,
  // Controller file
  [`${rootDirectory}/${moduleName}/${moduleName}.controller.ts`]: `
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ResponseDTO } from '../../common/dtos/response.dto';
import { SkipJwtAuth } from 'src/common/decorators/skip-guard.decorator';
import { ${capitalizeName}Service } from './${moduleName}.service';
import { Create${capitalizeName}Dto } from './dtos/create.${moduleName}.dto';
import { Update${capitalizeName}Dto } from './dtos/update.${moduleName}.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('${capitalizeName}')
@Controller('${moduleName}')
export class ${capitalizeName}Controller {
  constructor(private readonly ${camelCase}Service: ${capitalizeName}Service) { }

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all ${capitalizeName}s' })
  @ApiResponse({ status: 200, description: 'Return all ${capitalizeName}s' })
  async getAll(): Promise<ResponseDTO> {
    return await this.${camelCase}Service.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a ${capitalizeName} by id' })
  @ApiResponse({ status: 200, description: 'Return a ${capitalizeName}' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.${camelCase}Service.findOne({ id });
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new ${capitalizeName}' })
  @ApiResponse({
    status: 201,
    description: 'The ${capitalizeName} has been successfully created.',
  })
  async create(@Body() ${camelCase}: Create${capitalizeName}Dto): Promise<ResponseDTO> {
    return { data: await this.${camelCase}Service.create(${camelCase}) }
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a ${capitalizeName}' })
  @ApiResponse({
    status: 200,
    description: 'The ${capitalizeName} has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() ${camelCase}: Update${capitalizeName}Dto,
  ): Promise<ResponseDTO> {
    return await this.${camelCase}Service.update(id, ${camelCase});
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a ${capitalizeName}' })
  @ApiResponse({
    status: 200,
    description: 'The ${capitalizeName} has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.${camelCase}Service.deleteOne({ id });
  }
}
`,
  // Module file
  [`${rootDirectory}/${moduleName}/${moduleName}.module.ts`]: `
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${capitalizeName} } from './entities/${moduleName}.entity';
import { ${capitalizeName}Service } from './${moduleName}.service';
import { ${capitalizeName}Controller } from './${moduleName}.controller';

@Module({
  imports: [TypeOrmModule.forFeature([${capitalizeName}])],
  controllers: [${capitalizeName}Controller],
  providers: [${capitalizeName}Service],
  exports: [${capitalizeName}Service],
})
export class ${capitalizeName}Module {}
`,
  // Service spec file
  [`${rootDirectory}/${moduleName}/${moduleName}.service.spec.ts`]: `
import { Test, TestingModule } from '@nestjs/testing';
import { ${capitalizeName}Service } from './${moduleName}.service';

describe('${capitalizeName}Service', () => {
  let service: ${capitalizeName}Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [${capitalizeName}Service],
    }).compile();

    service = module.get<${capitalizeName}Service>(${capitalizeName}Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
`,
  [`${rootDirectory}/${moduleName}/${moduleName}.service.ts`]: `
import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ${capitalizeName} } from './entities/${moduleName}.entity';

@Injectable()
export class ${capitalizeName}Service extends CrudService<${capitalizeName}> {
  constructor(
    @InjectRepository(${capitalizeName}) private ${camelCase}Repository: Repository<${capitalizeName}>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(${camelCase}Repository, 'id', dataSourceInject);
  }
}
`,
};

// Create directories
directories.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Create files with basic content
Object.keys(files).forEach((file) => {
  fs.writeFileSync(file, files[file]);
});

console.log('Module structure generated successfully');

function generateEntity(json) {
  let entityClass = `import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';\n\n`;
  entityClass += `@Entity()\n`;
  entityClass += `export class ${capitalizeName} {\n\n`;

  const columnTypes = {
    boolean: `{ type: 'boolean', nullable: true }`,
    string: `{ nullable: true }`,
    number: `{ type: 'numeric', nullable: true }`,
    date: `{ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', nullable: true }`,
    stringArray: `'text', { array: true, nullable: true }`,
  };

  entityClass += `  @PrimaryGeneratedColumn('uuid')
  id: string;\n\n`;

  Object.keys(json).forEach((key) => {
    const value = json[key];
    const valueType = Array.isArray(value) ? 'stringArray' : typeof value;
    const columnOptions = columnTypes[valueType] || columnTypes.string;

    entityClass += `  @Column(${columnOptions})\n`;
    entityClass += `  ${key}: ${valueType === 'stringArray' ? 'string' : valueType}${Array.isArray(value) ? '[]' : ''};\n\n`;
  });

  entityClass += `  @Column({ type: 'boolean', default: true,  nullable: true })
  isActive: boolean;\n\n`;

  entityClass += `  @Column({ type: 'boolean', default: false,  nullable: true })
  isDeleted: boolean;\n\n`;

  entityClass += `  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true
  })
  createdAt?: Date;\n\n`;

  entityClass += `  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true
  })
  updatedAt?: Date;\n`;

  entityClass += `}\n`;

  return entityClass;
}

function generateDto(json, action) {
  let dtoClass = `import { ApiProperty } from '@nestjs/swagger';\n`;
  dtoClass += `import { IsNotEmpty`;
  const validations = {
    boolean: 'IsBoolean',
    string: 'IsString',
    number: 'IsNumber',
    date: 'IsDate',
    stringArray: 'ArrayNotEmpty',
  };

  Object.values(validations).forEach((validation) => {
    dtoClass += `, ${validation}`;
  });

  dtoClass += ` } from 'class-validator';\n\n`;
  dtoClass += `export class ${action === 'create' ? `Create${capitalizeName}Dto` : `Update${capitalizeName}Dto`} {\n\n`;

  // Generate properties with validation decorators
  Object.keys(json).forEach((key) => {
    const value = json[key];
    const valueType = Array.isArray(value) ? 'stringArray' : typeof value;
    const validationDecorator = `@${validations[valueType]}()\n`;

    dtoClass += `  @ApiProperty()\n`;
    dtoClass += `  ${validationDecorator}`;
    dtoClass += `  ${key}: ${valueType === 'stringArray' ? 'string[]' : valueType};\n\n`;
  });

  dtoClass += `}\n`;

  return dtoClass;
}

function generateDtoUpdate() {
  return `import { PartialType } from '@nestjs/swagger';
import { ${`Create${capitalizeName}Dto`} } from './create.${moduleName.toLowerCase()}.dto';

export class ${`Update${capitalizeName}Dto`} extends PartialType(${`Create${capitalizeName}Dto`}) {}`;
}

function generateInterfaces(json) {
  let interfaces = `export interface I${capitalizeName} {\n`;

  Object.keys(json).forEach((key) => {
    interfaces += `  ${key}: ${typeof json[key] === 'object' ? 'any' : typeof json[key]};\n`;
  });

  interfaces += `}\n\n`;

  return interfaces;
}

function generateAll(json) {
  const entity = generateEntity(json);
  const createDto = generateDto(json, 'create');
  const updateDto = generateDtoUpdate();
  const interfaces = generateInterfaces(json);

  fs.writeFileSync(
    `${rootDirectory}/${moduleName}/entities/${moduleName}.entity.ts`,
    entity,
  );
  fs.writeFileSync(
    `${rootDirectory}/${moduleName}/dtos/create.${moduleName}.dto.ts`,
    createDto,
  );
  fs.writeFileSync(
    `${rootDirectory}/${moduleName}/dtos/update.${moduleName}.dto.ts`,
    updateDto,
  );
  fs.writeFileSync(
    `${rootDirectory}/${moduleName}/interfaces/${moduleName}.interfaces.ts`,
    interfaces,
  );

  console.log(`Files generated for entity: ${moduleName}`);
}

generateAll(json.bridgeLoan);
