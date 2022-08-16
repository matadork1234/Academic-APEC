import { SetMetadata } from "@nestjs/common";

import { Roles } from "../enums/roles.enum";

export const META_ROLES = 'roles';

export const RoleProtected  = (...roles: Roles[]) => {
    return SetMetadata('roles', roles)
}