import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDTO {

    @ApiModelProperty()
    readonly name: string;

    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly password: string;
}
