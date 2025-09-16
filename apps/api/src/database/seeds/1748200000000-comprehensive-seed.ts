import { AccountEntity } from '@/auth/entities/account.entity';
import { UserEntity } from '@/auth/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class ComprehensiveSeed1748200000000 implements Seeder {
  track = true;

  public async run(
    dataSource: DataSource,
    _: SeederFactoryManager,
  ): Promise<any> {
    await dataSource.transaction(async (transactionManager) => {
      const userRepository = transactionManager.getRepository(UserEntity);
      const accountRepository = transactionManager.getRepository(AccountEntity);

      // Create admin user
      const adminUser = await userRepository.save(
        userRepository.create({
          username: 'admin',
          email: 'admin@admin.com',
          isEmailVerified: true,
          firstName: 'Admin',
          lastName: 'User',
          bio: 'System Administrator',
        }),
      );

      await accountRepository.save(
        accountRepository.create({
          userId: adminUser.id,
          providerId: 'credential',
        }),
      );

      // Create regular users
      await userRepository.save(
        userRepository.create({
          username: 'reader1',
          email: 'reader1@example.com',
          isEmailVerified: true,
          firstName: 'John',
          lastName: 'Doe',
          bio: '',
        }),
      );
    });
  }
}
