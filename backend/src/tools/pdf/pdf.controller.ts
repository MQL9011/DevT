import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Query,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { Response } from 'express';
import { PdfService } from './pdf.service';

@Controller('api/tools/pdf')
@ApiTags('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('to-images')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'PDF 转图片' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'PDF 文件',
        },
      },
    },
  })
  @ApiQuery({
    name: 'format',
    required: false,
    enum: ['png', 'jpeg', 'webp'],
    description: '输出图片格式',
  })
  @ApiQuery({
    name: 'quality',
    required: false,
    type: Number,
    description: '图片质量 (1-100)',
  })
  @ApiResponse({ status: 200, description: '转换成功' })
  async pdfToImages(
    @UploadedFile() file: Express.Multer.File,
    @Query('format') format: 'png' | 'jpeg' | 'webp' = 'png',
    @Query('quality') quality = 90,
  ) {
    return this.pdfService.pdfToImages(file.buffer, format, quality);
  }

  @Post('info')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: '获取 PDF 信息' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'PDF 文件',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: '获取成功' })
  async getPdfInfo(@UploadedFile() file: Express.Multer.File) {
    return this.pdfService.getPdfInfo(file.buffer);
  }

  @Post('merge')
  @UseInterceptors(FileInterceptor('files'))
  @ApiOperation({ summary: '合并多个 PDF' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: '合并成功' })
  async mergePdfs(
    @UploadedFile() files: Express.Multer.File[],
    @Res() res: Response,
  ) {
    const result = await this.pdfService.mergePdfs(
      Array.isArray(files) ? files.map((f) => f.buffer) : [],
    );

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="merged.pdf"');
    res.send(result);
  }
}
