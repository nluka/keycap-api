import { describe, expect, test } from '@jest/globals';
import app from '../app';

describe('app', () => {
  test('export is defined', () => {
    expect(app).toBeDefined();
  });
});
