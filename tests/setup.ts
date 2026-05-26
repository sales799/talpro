import '@testing-library/jest-dom';

process.env.NODE_ENV = 'test';
process.env.DATABASE_URL ||= 'postgresql://talpro:test@127.0.0.1:5432/talpro_test';
delete process.env.OPENAI_API_KEY;
