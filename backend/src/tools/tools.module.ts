import { Module } from '@nestjs/common';
import { JsonController } from './json/json.controller';
import { JsonService } from './json/json.service';
import { PdfController } from './pdf/pdf.controller';
import { PdfService } from './pdf/pdf.service';

@Module({
  controllers: [JsonController, PdfController],
  providers: [JsonService, PdfService],
})
export class ToolsModule {}
