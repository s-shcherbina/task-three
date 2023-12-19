import { userRepository } from '../repositories/userRepository.js';

class UserService {
  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  checkUser(message, item) {
    if (this.search(item)) {
      throw Error(`${message} (${Object.values(item)}) isn’t valid`);
    }
  }

  getAllUsers() {
    const users = userRepository.getAll();
    if (!users.length) {
      throw Error('Users not found');
    }
    return users;
  }

  getUser(id) {
    const user = this.search({ id });
    if (!user) {
      throw Error('User not found');
    }
    return user;
  }

  createUser(userData) {
    const message = 'User entity to create';
    this.checkUser(message, { email: userData.email });
    this.checkUser(message, { phoneNumber: userData.phoneNumber });
    return userRepository.create(userData);
  }

  updateUser(id, dataToUpdate) {
    const existUser = this.search({ id });
    if (!existUser) {
      throw Error('User not found');
    }

    const message = 'Data to update';
    if (existUser.email !== dataToUpdate.email)
      this.checkUser(message, { email: dataToUpdate.email });

    if (existUser.phoneNumber !== dataToUpdate.phoneNumber)
      this.checkUser(message, { phoneNumber: dataToUpdate.phoneNumber });

    return userRepository.update(id, dataToUpdate);
  }

  delete(id) {
    const existUser = this.search({ id });
    if (!existUser) {
      throw Error('User not found');
    }
    return userRepository.delete(id);
  }
}

const userService = new UserService();

export { userService };
