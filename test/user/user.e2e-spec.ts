import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpServer, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { validate, ValidationError } from 'class-validator';
import { AppModule } from '../../src/app.module';
import { CreateUserAndPersonaDto } from '../../src/modules/user/dtos/create.user.person.dto';
import { ConfigService } from '@nestjs/config';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let httpServer: HttpServer;
  let jwtToken: string;
  let userId;
  let personaId;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigService)
      .useValue({
        get: (key: string) => {
          const config = {
            'database.host': process.env.DATABASE_HOST,
            'jwt.key': process.env.JWT_KEY,
            'jwt.expired': process.env.AUTH_EXPIRED || '1h',
          };
          return config[key] || null;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer();

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'prueba2@yopmail.com', password: 'Pass.123' });

    jwtToken = response.body.data.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/POST erorr when create user', async () => {
    const createUserAndPersonaDto = new CreateUserAndPersonaDto();

    const errors: ValidationError[] = await validate(createUserAndPersonaDto);
    expect(errors.length).toBeGreaterThan(0);

    return request(httpServer)
      .post('/user')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(createUserAndPersonaDto)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('/POST create user success', () => {
    const createUserAndPersonaDto = {
      user: {
        email: 'test2@yopmail.com',
        communities: ['658d8dabaf1252b643e190c9'],
      },
      persona: {
        firstName: 'John',
        lastName: 'Doe',
        numberId: '12345678',
        isActive: true,
      },
    };

    return request(httpServer)
      .post('/user')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(createUserAndPersonaDto)
      .expect(HttpStatus.CREATED)
      .then((response) => {
        userId = response.body.data._id;
        personaId = response.body.data.persona;
      });
  });

  it('/PUT update user and persona', () => {
    const updateUserAndPersonaDto = {
      user: {
        email: 'updated@yopmail.com',
        communities: ['658d8dabaf1252b643e190c9'],
        persona: personaId,
      },
      persona: {
        firstName: 'Updated',
        lastName: 'User',
        numberId: '87654321',
        isActive: true,
      },
    };

    return request(app.getHttpServer())
      .put(`/user/${userId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(updateUserAndPersonaDto)
      .expect(200)
      .then((response) => {
        expect(response.body.data.email).toEqual(
          updateUserAndPersonaDto.user.email,
        );
        expect(response.body.data.persona.firstName).toEqual(
          updateUserAndPersonaDto.persona.firstName,
        );
      });
  });

  it('/GET all users', () => {
    return request(app.getHttpServer())
      .get('/user')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.data)).toBe(true);
      });
  });

  it('/GET one user', () => {
    return request(app.getHttpServer())
      .get(`/user/${userId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .then((response) => {
        expect(response.body.data._id).toEqual(userId);
      });
  });

  it('/DELETE user', () => {
    return request(app.getHttpServer())
      .delete(`/user/${userId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .then((response) => {
        expect(response.body.data.message).toEqual(
          'Usuario y persona eliminados correctamente',
        );
      });
  });
});
