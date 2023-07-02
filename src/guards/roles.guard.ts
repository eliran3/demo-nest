import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: string[], req: any): boolean {
    var flag = false;

    console.log('roles:', roles);
    console.log('cookies:', req.cookies);
    console.log('query:', req.query);

    if (roles?.includes(Role.User) && req.cookies['session'] == 'user_bro') {
      console.log('got user!');
      flag = true;
    } else if (
      roles?.includes(Role.Root) &&
      req.cookies['session'] == 'root_bro'
    ) {
      console.log('got root!');
      flag = true;
    } else if (!roles) {
      console.log('no roles need to be checked!');
      flag = true;
    } else {
      console.log('got nothing!');
    }

    console.log('----------------------------------------');

    return flag;
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const req = context.switchToHttp().getRequest();

    return this.matchRoles(roles, req);
  }
}
