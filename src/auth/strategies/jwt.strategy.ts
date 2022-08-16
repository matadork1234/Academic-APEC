import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_SECRET } from "src/common/constant/constant";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { IJwtPayload } from "../interfaces";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        private configService: ConfigService,
        
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>(JWT_SECRET)
        })
    }

    async validate(payload: IJwtPayload): Promise<User> {
        var { id } = payload;

        var user = await this.userRepository.findOne({
            where: {
                id: id
            }
        });

        if (!user) throw new UnauthorizedException(`token invalid`);

        if (!user.isActive) throw new UnauthorizedException(`User is inactive, please contact with administrator`);

        return user;

    }
}