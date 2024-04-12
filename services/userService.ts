import { getRepository } from "typeorm";
import { User } from "../models/user";
import bcrypt from "bcrypt";

export default class UserService {
  private userRepository = getRepository(User);

  async getUserById(userId: number) {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async getUserByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async createUser(username: string, password: string, role: string) {
    if (!username || !password) {
      throw new Error("Username and password are required");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const verificationCode = this.generateVerificationCode();

    const newUser = this.userRepository.create({
      username,
      passwordHash,
      verificationCode,
      role,
    });

    return this.userRepository.save(newUser);
  }

  async updateUser(userId: number, newData: Partial<User>) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }
    Object.assign(user, newData);

    return this.userRepository.save(user);
  }

  async deleteUser(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }

    return this.userRepository.remove(user);
  }

  async verifyUser(verificationCode: string) {
    const user = await this.userRepository.findOne({
      where: { verificationCode },
    });
    if (!user) {
      throw new Error("User not found");
    }

    user.isVerified = true;
    //user.verificationCode = null;

    return this.userRepository.save(user);
  }

  async getAllUsers() {
    return this.userRepository.find();
  }

  private generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
