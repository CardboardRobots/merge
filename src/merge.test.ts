import { merge } from './merge';

describe('deepMerge', () => {
  it('should include keys from valueA', () => {
    const result = merge({ value: 'a' }, {});
    expect(result.value).toBe('a');
  });

  it('should include keys from valueB', () => {
    const result = merge({}, { value: 'b' });
    expect(result.value).toBe('b');
  });

  it('should take values from valueA before valueB', () => {
    const result = merge({ value: 'a' }, { value: 'b' });
    expect(result.value).toBe('a');
  });

  it('should merge nested objects', () => {
    const result = merge(
      { value: { valueA: 'a' } },
      { value: { valueB: 'b' } }
    );
    expect(result.value.valueA).toBe('a');
    expect(result.value.valueB).toBe('b');
  });
});
