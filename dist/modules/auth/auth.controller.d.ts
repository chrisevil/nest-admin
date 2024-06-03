import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { LoginToken } from './models/auth.model';
import { CaptchaService } from './services/captcha.service';
export declare class AuthController {
    private authService;
    private userService;
    private captchaService;
    constructor(authService: AuthService, userService: UserService, captchaService: CaptchaService);
    login(dto: LoginDto, ip: string, ua: string): Promise<LoginToken>;
    register(dto: RegisterDto): Promise<void>;
}
