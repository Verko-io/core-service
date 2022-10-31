import { Observable } from 'rxjs';

import { CanActivate, ExecutionContext } from '@nestjs/common';

export default interface ActivateGuard extends CanActivate {
  // constructor(reflector: Reflector): void;

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;

  isPublic(context: ExecutionContext): boolean;
}

// export default function ActivateGuard(name): ActivateGuard {
//   const guard = AuthGuard(name);
//   guard.isPublic = function (context: ExecutionContext): boolean {
//     const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     console.log('isPublic', isPublic);
//     if (isPublic) {
//       return true;
//     }
//   };
//   return guard;
// }
