import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/services/user/user.service';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [],
})
export class AuthModule {}
