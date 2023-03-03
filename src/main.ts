import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    const port = parseInt(process.env.PORT) || 3000;
    const server = await app.listen(port, () => {
        const address = server.address();
        const serverUrl = typeof address === 'string' ? address : `http://${address.address}:${address.port}`;
        console.log(`Application is running on: ${serverUrl}`);
    });
}

bootstrap();
