const userService = require("../services/userService");

const cookieMaxAge = 30 * 24 * 60 * 60 * 1000;

class UserController {
  async signUp(req, res) {
    try {
      const { name, email, password } = req.body;
      const userData = await userService.signUp(name, email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: cookieMaxAge,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      console.log(e);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: cookieMaxAge,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      console.log(e);
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const token = userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {}
  }

  async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: cookieMaxAge,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {}
  }
}

module.exports = new UserController();
