import { Role } from '@/api/user/user.enum';
import { ADMIN_ONLY_KEY } from '@/decorators/auth/admin-only.decorator';
import { I18nTranslations } from '@/generated/i18n.generated';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly i18nService: I18nService<I18nTranslations>,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiresAdmin = this.reflector.getAllAndOverride<boolean>(
      ADMIN_ONLY_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiresAdmin) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.roles || !user.roles.includes(Role.Admin)) {
      throw new ForbiddenException(this.i18nService.t('comic.accessDenied'));
    }

    return true;
  }
}
