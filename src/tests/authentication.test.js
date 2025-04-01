function isValidUser(username, password) {
  const validUsers = [ // valid user credentials for testing
    { username: 'test@email.com', password: '123456' },
  ];
  return validUsers.some(user => user.username === username && user.password === password);
}

test('should return true for valid username and password', () => {
  const result = isValidUser('test@email.com', '123456');
  expect(result).toBe(true);
});

test('should return false for invalid username', () => {
  const result = isValidUser('admin', '123456');
  expect(result).toBe(false);
});

test('should return false for invalid password', () => {
  const result = isValidUser('test@email.com', 'wrongpassword');
  expect(result).toBe(false);
});
