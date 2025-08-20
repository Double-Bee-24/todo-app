import { test, describe } from 'node:test'
import assert from 'node:assert'
import { greet } from './index.ts'

void describe('Hello World Functions', () => {
  void test('greet function should return correct greeting', () => {
    const result = greet('World')
    assert.strictEqual(result, 'Hello, World!')
  })
})
