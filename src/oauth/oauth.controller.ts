import { Controller, Post, Req, Res, Inject } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { Request, Response } from "express";

import OAuth2Server = require("oauth2-server");

import { OAuthService } from './oauth.service';
import { OAuthPublic } from '../lib/oauth/oauth.decorators';

@OAuthPublic()
@ApiUseTags('OAuth')
@Controller('oauth')
export class OAuthController {

    @Inject(OAuthService)
    private readonly service: OAuthService;

    @Post('token')
    accessToken(@Req() req: Request, @Res() res: Response) {
        const request = new OAuth2Server.Request(req);
        const response = new OAuth2Server.Response(res);

        this.service.oauth.token(request, response).then((token) => {
            res.json({
                access_token: token.accessToken,
                refresh_token: token.refreshToken,
                expires: Math.floor((token.accessTokenExpiresAt.getTime()
                    - new Date().getTime()) / 1000)
            })
        }).catch((error) => {
            res.send(error);
        });
    }

    @Post('logout')
    logout() {

    }
}
