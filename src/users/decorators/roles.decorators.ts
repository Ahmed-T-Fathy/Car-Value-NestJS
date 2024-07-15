import { SetMetadata } from '@nestjs/common';

// Custom decorator named `Roles` that accepts a list of roles as arguments.
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);