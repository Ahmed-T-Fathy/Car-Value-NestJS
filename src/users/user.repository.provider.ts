// src/users/users.repository.provider.ts
import { DataSource } from 'typeorm';
import { UserRepository } from './user.repository';

export const UserRepositoryProvider = {
  provide: 'USER_REPOSITORY',
  useFactory: (dataSource: DataSource) => {
    return new UserRepository(dataSource.manager);
  },
  inject: [DataSource],
};
