import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { IResponseToken } from './interfaces/response-token.interface';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly jwtService: JwtService
    ) {}


    async register(createUserDto: CreateUserDto): Promise<IResponseToken> {
        try {
            const { password, ...userData } = createUserDto;

            const user = this.userRepository.create({
                ...userData,
                password: bcrypt.hashSync(password, 10)
            });

            await this.userRepository.save(user);
            delete user.password

            return {
                user,
                token: this.getJwtToken({ id: user.id, email: user.email })
            }
            

        } catch (error) {
            this.handleError(error);
        }
    }

    async login(loginUserDto: LoginUserDto): Promise<IResponseToken> {
        const { email, password } = loginUserDto;
        const user = await this.userRepository.findOne({
            where: {
                email: email
            },
            select: ['id', 'email', 'documentIdentity', 'password']
        });

        if (!user) throw new UnauthorizedException('Credentiasl incorrects');

        if (!bcrypt.compareSync(password, user.password)) throw new UnauthorizedException(`Credentials are not valid`);

        delete user.password;
        return {
            user,
            token: this.getJwtToken({ id: user.id, email: user.email })
        }
    }

    private getJwtToken(payload: IJwtPayload): string {
        var token = this.jwtService.sign(payload);
        return token;
    }

    private handleError(error: any): never {
        if (error.code === '23505') throw new BadRequestException(error.detail);

        throw new InternalServerErrorException('Please check server logs');
    }
}
