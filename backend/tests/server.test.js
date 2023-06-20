const request = require('supertest');
const app = require('../dist/server.js');
const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid').v4; // Ensure you've required it at the top of the file

jest.mock('uuid', () => ({
    v4: () => 'mock-uuid-v4',
  }));

// Mock multer upload to avoid actual file upload while testing
jest.mock('multer', () => {
  return () => {
    return {
      single: () => (req, res, next) => {
        req.file = {
          originalname: 'test.jpg',
          path: `uploads/test-mock-uuid-v4.jpg`,
          mimetype: 'image/jpeg',
          size: 123456,
        };
        next();
      },
    };
  };
});

// Mock sequelize functions to avoid actual database interactions
jest.mock('../dist/models/Media', () => {
  return () => ({
    create: jest.fn(),
    findOne: jest.fn(),
    destroy: jest.fn(),
    update: jest.fn(),
  });
});

jest.mock('../dist/models/Tag', () => {
  return {
    create: jest.fn(),
    findOne: jest.fn(),
  };
});
describe('POST /upload', () => {
  it('responds with status 200 when a file is uploaded', async () => {
    const response = await request(app).post('/upload');
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /api/uploads', () => {
  it('responds with status 200 and a list of files', async () => {
    const response = await request(app).get('/api/uploads');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('DELETE /api/uploads/:id', () => {
  it('responds with status 200 when a file is deleted', async () => {
    const response = await request(app).delete('/api/uploads/1');
    expect(response.statusCode).toBe(200);
  });
});

describe('PATCH /api/uploads/:id', () => {
  it('responds with status 200 when a file is updated', async () => {
    const response = await request(app).patch('/api/uploads/1').send({title: 'updated-title.jpg'});
    expect(response.statusCode).toBe(200);
  });
});
