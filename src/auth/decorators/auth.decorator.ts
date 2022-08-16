import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles } from "../enums/roles.enum";

import { JwtAuthGuard, RoleAuthGuard } from '../guards';
import { RoleProtected } from "./";

export const Auth = (...roles: Roles[]) => {
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(JwtAuthGuard, RoleAuthGuard)
    )
} 