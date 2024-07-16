import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

// The `RolesGuard` class implements the `CanActivate` interface, which has a method `canActivate`.
@Injectable()
export class RolesGuard implements CanActivate {
  // The `Reflector` service is used to read the metadata attached to the route handler.
  constructor(private reflector:Reflector){}

  // `canActivate` method is invoked to decide if the current request is allowed to proceed.
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Get the roles metadata set by the `Roles` decorator.
    const roles=this.reflector.get<string>('roles',context.getHandler())
    if(!roles){
      // If no roles metadata is found, allow the request to proceed.
      return true;
    }

    // Extract the request object from the execution context.
    const request=context.switchToHttp().getRequest();

    // Get the user object from the request (assuming it's attached by some authentication middleware).
    const user=request.user;

    // Check if the user's role is included in the allowed roles.
      return roles.includes(user.role);
  }
}