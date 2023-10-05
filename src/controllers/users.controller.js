import UserService from '../services/db/users.service.js';

class UsersController {
    constructor() {
        this.userService = new UserService();
    }

    async getUsers(req, res) {
        const users = await this.userService.getAllUsers();
        res.json(users);
    }

    async createUser(req, res) {
        const userData = req.body;
        const result = await this.userService.saveUser(userData);
        res.json(result);
    }

    async findUser(req, res) {
        const username = req.params.username;
        const result = await this.userService.findUserByUsername(username);
        res.json(result);
    }

    async updateUser(req, res) {
        const filter = {  };
        const value = {  };
        const result = await this.userService.updateUser(filter, value);
        res.json(result);
    }
}

export default UsersController;
