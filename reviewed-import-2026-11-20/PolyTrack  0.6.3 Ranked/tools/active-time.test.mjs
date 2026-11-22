import test from 'node:test';
import assert from 'node:assert/strict';
import { formatActiveTime } from './active-time.mjs';

test('formats measured duration from seconds through hours', () => {
  assert.equal(formatActiveTime(0), '0s');
  assert.equal(formatActiveTime(59_999), '59s');
  assert.equal(formatActiveTime(60_000), '1m 0s');
  assert.equal(formatActiveTime(3_600_000), '1h 0m 0s');
  assert.equal(formatActiveTime((99 * 60 + 59) * 60_000), '99h 59m 0s');
});

test('uses one-decimal days starting at 100 hours', () => {
  assert.equal(formatActiveTime(100 * 3_600_000), '4.2d');
  assert.equal(formatActiveTime(120 * 3_600_000), '5.0d');
});

test('invalid or negative values never produce NaN or negative time', () => {
  for (const value of [undefined, null, NaN, Infinity, -1, 'invalid']) {
    assert.equal(formatActiveTime(value), '0s');
  }
});
