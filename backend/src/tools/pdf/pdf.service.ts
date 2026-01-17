import { Injectable, BadRequestException } from '@nestjs/common';
import { PDFDocument } from 'pdf-lib';

@Injectable()
export class PdfService {
  async pdfToImages(
    pdfBuffer: Buffer,
    format: 'png' | 'jpeg' | 'webp' = 'png',
    quality = 90,
  ) {
    try {
      const pdfDoc = await PDFDocument.load(pdfBuffer);
      const pageCount = pdfDoc.getPageCount();

      // 注意：完整的 PDF 转图片需要使用 pdf2pic 或 pdfjs-dist
      // 这里返回基本信息，实际转换功能需要根据环境配置
      return {
        success: true,
        message: 'PDF 解析成功',
        pageCount,
        format,
        quality,
        // 实际项目中会返回 base64 图片数组
        images: [],
        note: 'PDF 转图片功能需要配置 Ghostscript 或 GraphicsMagick',
      };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'PDF 解析失败',
        error: (error as Error).message,
      });
    }
  }

  async getPdfInfo(pdfBuffer: Buffer) {
    try {
      const pdfDoc = await PDFDocument.load(pdfBuffer);
      const pages = pdfDoc.getPages();

      return {
        success: true,
        info: {
          pageCount: pdfDoc.getPageCount(),
          title: pdfDoc.getTitle() || null,
          author: pdfDoc.getAuthor() || null,
          subject: pdfDoc.getSubject() || null,
          creator: pdfDoc.getCreator() || null,
          producer: pdfDoc.getProducer() || null,
          creationDate: pdfDoc.getCreationDate()?.toISOString() || null,
          modificationDate: pdfDoc.getModificationDate()?.toISOString() || null,
          pages: pages.map((page, index) => ({
            pageNumber: index + 1,
            width: page.getWidth(),
            height: page.getHeight(),
            rotation: page.getRotation().angle,
          })),
        },
      };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'PDF 解析失败',
        error: (error as Error).message,
      });
    }
  }

  async mergePdfs(pdfBuffers: Buffer[]) {
    if (pdfBuffers.length < 2) {
      throw new BadRequestException({
        success: false,
        message: '至少需要 2 个 PDF 文件',
      });
    }

    try {
      const mergedPdf = await PDFDocument.create();

      for (const buffer of pdfBuffers) {
        const pdf = await PDFDocument.load(buffer);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      return Buffer.from(await mergedPdf.save());
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'PDF 合并失败',
        error: (error as Error).message,
      });
    }
  }
}
