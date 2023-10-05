import userModel from './models/user.model.js';

export default class UserService {
    constructor() {
        console.log("Calling users model using a service.");
    }

    async getAllUsers() {
        const users = await userModel.find();
        return users.map(user => user.toObject());
    }

    async saveUser(user) {
        const result = await userModel.create(user);
        return result;
    }

    async findUserByUsername(username) {
        const result = await userModel.findOne({ email: username });
        return result;
    }

    async updateUser(filter, value) {
        console.log("Update user with filter and value:");
        console.log(filter);
        console.log(value);
        const result = await userModel.updateOne(filter, value);
        return result;
    }
}