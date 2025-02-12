const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const tokenService = require("../services/tokenService");
const UserDto = require("../dtos/userDto");
const res = require("express/lib/response");

class UserService {
  async signUp(name, email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      return res.status(404).send(`User already exists with email ${email}`);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name,
      email,
      password: hashPassword,
    });

    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send("User is not exist with this email");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(404).send("Incorrect password");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if(!refreshToken) {
      res.status(401).send("Unauthorized");
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = tokenService.findToken(refreshToken);

    if(!userData || !tokenFromDB) {
      return res.status(401).send("Unauthorized");
    }

    const user = UserModel.findById(userData.id)
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

module.exports = new UserService();
