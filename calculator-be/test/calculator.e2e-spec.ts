import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerValidatorPipe } from '../src/common/swagger-validator.pipe';
import { Operations } from '../src/calculator/operations.enum';

describe('CalculatorController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const options = new DocumentBuilder()
      .setTitle('Calculator service')
      .setDescription('The calculator API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(new SwaggerValidatorPipe(document));
    await app.init();
  });

  describe('/calculate (POST)', () => {
    const url = '/calculate';

    it('should not bypass missing body', () => {
      return request(app.getHttpServer())
        .post(url)
        .expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should not bypass empty body', () => {
      return request(app.getHttpServer())
        .post(url)
        .send({})
        .expect(HttpStatus.UNPROCESSABLE_ENTITY)
        .expect(res => {
          expect(res.body.error[0].message).toEqual(
            `should have required property 'operation'`,
          );
        });
    });

    it('should validate operation', () => {
      return request(app.getHttpServer())
        .post(url)
        .send({
          operation: 'foo',
        })
        .expect(HttpStatus.UNPROCESSABLE_ENTITY)
        .expect(res => {
          expect(res.body.error[0].message).toEqual(
            `should be equal to one of the allowed values`,
          );
        });
    });

    it('should require left operand', () => {
      return request(app.getHttpServer())
        .post(url)
        .send({
          operation: Operations.Division,
        })
        .expect(HttpStatus.UNPROCESSABLE_ENTITY)
        .expect(res => {
          expect(res.body.error[0].message).toEqual(
            `should have required property 'left'`,
          );
        });
    });

    it('should validate left operand', () => {
      return request(app.getHttpServer())
        .post(url)
        .send({
          operation: Operations.Division,
          left: 'sgsfg',
        })
        .expect(HttpStatus.UNPROCESSABLE_ENTITY)
        .expect(res => {
          expect(res.body.error[0].message).toMatch(/should match pattern/);
        });
    });

    it('should allow exponent', () => {
      return request(app.getHttpServer())
        .post(url)
        .send({
          operation: Operations.Division,
          left: '6.666666668667666666655e+21',
        })
        .expect(HttpStatus.UNPROCESSABLE_ENTITY)
        .expect(res => {
          expect(res.body.error[0].message).toEqual(
            `should have required property 'right'`,
          );
        });
    });

    it('should bypass Infinity', () => {
      return request(app.getHttpServer())
        .post(url)
        .send({
          operation: Operations.Division,
          left: 'Infinity',
        })
        .expect(HttpStatus.UNPROCESSABLE_ENTITY)
        .expect(res => {
          expect(res.body.error[0].message).toEqual(
            `should have required property 'right'`,
          );
        });
    });

    it('should require right operand', () => {
      return request(app.getHttpServer())
        .post(url)
        .send({
          operation: Operations.Division,
          left: '3',
        })
        .expect(HttpStatus.UNPROCESSABLE_ENTITY)
        .expect(res => {
          expect(res.body.error[0].message).toEqual(
            `should have required property 'right'`,
          );
        });
    });

    it('should validate right operand', () => {
      return request(app.getHttpServer())
        .post(url)
        .send({
          operation: Operations.Division,
          left: '3',
          right: 'sgsfg',
        })
        .expect(HttpStatus.UNPROCESSABLE_ENTITY)
        .expect(res => {
          expect(res.body.error[0].message).toMatch(/should match pattern/);
        });
    });

    describe('happy path', () => {
      it('should make simple division', () => {
        return request(app.getHttpServer())
          .post(url)
          .send({
            operation: Operations.Division,
            left: '3',
            right: '3',
          })
          .expect(HttpStatus.OK, { result: '1' });
      });
    });
  });
});
