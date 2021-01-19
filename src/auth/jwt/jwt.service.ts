import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersEntity } from 'src/users/users.entity';

@Injectable()
export class JwtService {
  signin(userPayload: UsersEntity): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        userPayload,
        process.env.JWT_PASSWORD,
        { expiresIn: process.env.JWT_EXPIRESIN },
        (err, result) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          return resolve(result);
        },
      );
    });
  }

  verify(token: string): Promise<UsersEntity> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_PASSWORD, (err, result) => {
        if (err) {
          console.log(err);
          return reject(false);
        }
        return resolve(result as UsersEntity);
      });
    });
  }
}
