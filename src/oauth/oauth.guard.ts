import { APP_GUARD } from '@nestjs/core';
import { getAction } from '@nestjsx/crud';
import {
    CanActivate,
    Injectable,
    ExecutionContext,
    Inject,
    Provider,
    UnauthorizedException,
} from '@nestjs/common';

import { Observable } from 'rxjs';

import { Request } from 'express';

import {
    Request as OAuthRequest,
    Response as OAuthResponse,
} from 'oauth2-server';

import { OAuthService } from './oauth.service';
import { OAUTH_PUBLIC, OAUTH_SCOPE, OAUTH_ACTIONS_SCOPE } from '../lib/meta';


const isPublic = target => Reflect.getMetadata(OAUTH_PUBLIC, target);

const getScope = (target): string[] => Reflect.getMetadata(OAUTH_SCOPE, target)
    || [];
    
const getActionScopes = (target, action: string) => {
    const actions = Reflect.getMetadata(OAUTH_ACTIONS_SCOPE, target);
    return (actions && actions[action]) || [];
};


@Injectable()
export class OAuthGuard implements CanActivate {

    @Inject(OAuthService)
    private readonly service: OAuthService;

    canActivate(context: ExecutionContext): boolean | Promise<boolean> |
        Observable<boolean> {
        const controller = context.getClass();
        const method = context.getHandler();

        return (
            isPublic(method) ||
            isPublic(controller) ||
            this.authenticate(context)
        );
    }

    async authenticate(context: ExecutionContext): Promise<boolean> {
        const req: Request & { user: any } = context.switchToHttp().getRequest();
        const res: Response = context.switchToHttp().getResponse();

        const actionScopes = getActionScopes(
            context.getClass(),
            getAction(context.getHandler()),
        );

        const scope = [].concat(
            getScope(context.getClass()),
            getScope(context.getHandler()),
            actionScopes,
        );

        return this.service.oauth
            .authenticate(new OAuthRequest(req),
                new OAuthResponse(res), { scope })
            .then(token => {
                req.user = token.user;
                return true;
            }).catch((error) => {
                throw new UnauthorizedException();
            });
    }

    static register(): Provider {
        return {
            provide: APP_GUARD,
            useClass: this,
        };
    }
}
