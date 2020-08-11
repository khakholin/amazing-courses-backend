import { Body, Controller, Post } from '@nestjs/common';

import { SendMail } from 'src/email/sendEmail';
import { WelcomeService } from './welcome.service';

@Controller('welcome')
export class WelcomeController {
    constructor(
        private welcomeService: WelcomeService,
    ) { }

    @Post('registration')
    async recoveryPassword(@Body() body) {
        return this.welcomeService.recovery(body);
    }
}
