import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { TokenDTO } from '../dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles: string[] = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();
    const authorizationBearer = request.headers.authorization;
    if (!authorizationBearer) {
      return false;
    }
    const token: TokenDTO = jwt.verify(
      authorizationBearer.replace('Bearer ', ''),
      'secret',
    ) as TokenDTO;
    const hasRole = () => token.roles.some((role) => roles.includes(role));
    return token && token.roles && hasRole();
  }
}
