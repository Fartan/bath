import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import OAuth2Server = require('oauth2-server');

import uuid from 'uuid/v4';

import { UserService } from '../user/user.service';
import clients from './clients.json';

@Injectable()
export class OAuthService implements OAuth2Server.PasswordModel,
    OAuth2Server.RefreshTokenModel {

    public readonly oauth: OAuth2Server = new OAuth2Server({
        model: this,
    });

    @Inject(JwtService)
    private readonly jwtService: JwtService;

    @Inject(UserService)
    private readonly userService: UserService;

    async generateAccessToken?(client: OAuth2Server.Client,
        user: OAuth2Server.User, scope: string | string[]): Promise<string> {
        return this.jwtService.sign(
            {
                scope: scope,
                sub: user.id,
                aud: client.id,
                jti: uuid(),
                user: {
                    email: user.email,
                    name: user.name,
                }
            },
            {
                expiresIn: client.accessTokenLifetime,
            },
        );
    }

    async generateRefreshToken?(client: OAuth2Server.Client,
        user: OAuth2Server.User, scope: string | string[]): Promise<string> {
        return this.jwtService.sign(
            {
                scope: scope,
                sub: user.id,
                aud: client.id,
                jti: uuid()
            },
            {
                expiresIn: client.refreshTokenLifetime,
            },
        );
    }

    async getAccessToken(accessToken: string): Promise<OAuth2Server.Token> {
        const payload = this.jwtService.verify(accessToken);

        return {
            accessToken: accessToken,
            accessTokenExpiresAt: new Date(payload.exp * 1000),
            scope: payload.scope,
            client: clients[payload.aud],
            user: payload.user
        };
    }

    async getRefreshToken(refreshToken: string):
        Promise<OAuth2Server.RefreshToken> {
        const payload = this.jwtService.verify(refreshToken);
        const user = await this.userService.findById(payload.sub);
        const client = { ...clients[payload.aud] };
        delete client.secret;

        return {
            refreshToken: refreshToken,
            refreshTokenExpiresAt: new Date(payload.exp * 1000),
            scope: payload.scope,
            client: client,
            user: user
        };
    }

    async getUser(email: string, password: string): Promise<OAuth2Server.User> {
        return this.userService.validate(email, password);
    }

    async getClient(clientId: string, clientSecret: string):
        Promise<OAuth2Server.Client> {
        const client = clients[clientId];

        if (client && client.secret === clientSecret) return client;
        return null;
    }

    // TODO: Salvar tokens gerados para ter controle sobre as sessões
    async saveToken(token: OAuth2Server.Token, client: OAuth2Server.Client,
        user: OAuth2Server.User): Promise<OAuth2Server.Token> {
        return {
            ...token,
            client,
            user,
        };
    }

    // TODO: Colocar Token na lista negra
    async revokeToken(token: OAuth2Server.RefreshToken): Promise<boolean> {
        return true;
    }

    async verifyScope(token: OAuth2Server.Token, scope: string | string[]):
        Promise<boolean> {
        const payload = this.jwtService.verify(token.accessToken);
        const tokenScope = payload.scope;

        if (typeof scope == 'string') scope = scope.split(',');
        if (scope.length == 0) return true;

        return scope.some(item => tokenScope.includes(item));
    }
}
