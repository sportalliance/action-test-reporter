test('Timeout test', async () => {
  // a never-resolving promise to test the timeout
  await new Promise(() => {});
}, 1);

test.skip('Skipped test', () => {
  // do nothing
});
