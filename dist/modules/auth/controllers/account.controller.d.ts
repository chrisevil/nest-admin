import { FastifyRequest } from 'fastify';
import { PasswordUpdateDto } from '~/modules/user/dto/password.dto';
import { AccountInfo } from '../../user/user.model';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { AccountUpdateDto } from '../dto/account.dto';
export declare class AccountController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    profile(user: IAuthUser): Promise<AccountInfo>;
    logout(user: IAuthUser, req: FastifyRequest): Promise<void>;
    menu(user: IAuthUser): Promise<import("~/utils").RouteRecordRaw[]>;
    permissions(user: IAuthUser): Promise<string[]>;
    update(user: IAuthUser, dto: AccountUpdateDto): Promise<void>;
    password(user: IAuthUser, dto: PasswordUpdateDto): Promise<void>;
}
