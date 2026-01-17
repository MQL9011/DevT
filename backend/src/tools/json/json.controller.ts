import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { JsonService } from './json.service';
import { FormatJsonDto, JsonToTypeDto } from './json.dto';

@Controller('api/tools/json')
@ApiTags('json')
export class JsonController {
  constructor(private readonly jsonService: JsonService) {}

  @Post('format')
  @ApiOperation({ summary: '格式化 JSON' })
  @ApiBody({ type: FormatJsonDto })
  @ApiResponse({ status: 200, description: '格式化成功' })
  @ApiResponse({ status: 400, description: 'JSON 格式错误' })
  formatJson(@Body() dto: FormatJsonDto) {
    return this.jsonService.formatJson(dto.json, dto.indent);
  }

  @Post('minify')
  @ApiOperation({ summary: '压缩 JSON' })
  @ApiBody({ type: FormatJsonDto })
  @ApiResponse({ status: 200, description: '压缩成功' })
  minifyJson(@Body() dto: FormatJsonDto) {
    return this.jsonService.minifyJson(dto.json);
  }

  @Post('validate')
  @ApiOperation({ summary: '验证 JSON 格式' })
  @ApiBody({ type: FormatJsonDto })
  @ApiResponse({ status: 200, description: '验证结果' })
  validateJson(@Body() dto: FormatJsonDto) {
    return this.jsonService.validateJson(dto.json);
  }

  @Post('to-typescript')
  @ApiOperation({ summary: 'JSON 转 TypeScript 类型' })
  @ApiBody({ type: JsonToTypeDto })
  @ApiResponse({ status: 200, description: '转换成功' })
  jsonToTypescript(@Body() dto: JsonToTypeDto) {
    return this.jsonService.jsonToTypescript(dto.json, dto.typeName);
  }
}
