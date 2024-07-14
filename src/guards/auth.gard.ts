import{
    CanActivate,
    ExecutionContext,
    NotFoundException
} from '@nestjs/common'
import { Observable } from 'rxjs'

export class AuthGard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const req= context.switchToHttp().getRequest();
        if(!req.session.userId)throw new NotFoundException('User ID not found. Try again');
        return req.session.userId;
    }
}