import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class FormatJsonDto {
  @ApiProperty({
    description: 'JSON 字符串',
    example: '{"name":"DevTool","version":"1.0.0"}',
  })
  @IsString()
  json: string;

  @ApiProperty({
    description: '缩进空格数',
    example: 2,
    required: false,
    default: 2,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(8)
  indent?: number;
}

export class JsonToTypeDto {
  @ApiProperty({
    description: 'JSON 字符串',
    example: '{"name":"DevTool","version":"1.0.0","active":true}',
  })
  @IsString()
  json: string;

  @ApiProperty({
    description: '类型名称',
    example: 'Config',
    required: false,
    default: 'Root',
  })
  @IsOptional()
  @IsString()
  typeName?: string;
}
