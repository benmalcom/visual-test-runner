export function runDummyTest(callback) {
  const delay = 3000 + Math.random() * 3000;
  const testPassed = Math.random() > 0.5;

  setTimeout(function () {
    callback(testPassed);
  }, delay);
}
