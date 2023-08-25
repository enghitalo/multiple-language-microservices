// Simulated user data, replace with your database logic

const users = [
  {
    id: 1,
    username: "admin",
    password: "$2b$10$dX04zr/b5AzhEUIfLmbB3OMblz.UFn9NqvmCqezHPeWtJahwE.9Wm",
  }, // Hashed 'admin'
];

export class UserRepository {
  constructor() {}

  getById(id: string) {}

  getByUsername(username: string) {
    return users.find((u) => u.username === username);
  }
}
