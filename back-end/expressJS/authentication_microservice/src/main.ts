import express from "express";
import bcrypt from "bcrypt";
import { validate, IsNotEmpty, IsString } from "class-validator";
import { plainToClass } from "class-transformer";
import { LoginDto } from "./login.dto";
import { generateJwtToken } from "./jwt";

const app = express();
app.use(express.json());

/**
 * TODO refactor all this using async/await
 */
app.post("/auth/login", (req, res) => {
  const loginDto = plainToClass(LoginDto, req.body);
  const userRepository = new UserRepository();

  validate(loginDto).then((errors) => {
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
  });

  const user = userRepository.getByUsername(loginDto.username);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  bcrypt.compare(loginDto.password, user.password).then((isValid) => {
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  });

  const token = generateJwtToken({
    sub: user.id.toString(),
    name: user.username,
    exp: new Date(new Date().getTime() + 60 * 60 * 60 * 1000).toISOString(), // expires in "1h"
  });
  
  res.json({ token });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
