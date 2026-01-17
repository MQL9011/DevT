import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class JsonService {
  formatJson(json: string, indent = 2) {
    try {
      const parsed = JSON.parse(json);
      const formatted = JSON.stringify(parsed, null, indent);
      return {
        success: true,
        result: formatted,
      };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'JSON 格式错误',
        error: (error as Error).message,
      });
    }
  }

  minifyJson(json: string) {
    try {
      const parsed = JSON.parse(json);
      const minified = JSON.stringify(parsed);
      return {
        success: true,
        result: minified,
      };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'JSON 格式错误',
        error: (error as Error).message,
      });
    }
  }

  validateJson(json: string) {
    try {
      JSON.parse(json);
      return {
        success: true,
        valid: true,
        message: 'JSON 格式正确',
      };
    } catch (error) {
      return {
        success: true,
        valid: false,
        message: 'JSON 格式错误',
        error: (error as Error).message,
      };
    }
  }

  jsonToTypescript(json: string, typeName = 'Root') {
    try {
      const parsed = JSON.parse(json);
      const typeDefinition = this.generateTypeDefinition(parsed, typeName);
      return {
        success: true,
        result: typeDefinition,
      };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'JSON 格式错误',
        error: (error as Error).message,
      });
    }
  }

  private generateTypeDefinition(
    obj: unknown,
    name: string,
    indent = 0,
  ): string {
    const spaces = '  '.repeat(indent);

    if (obj === null) {
      return 'null';
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        return 'unknown[]';
      }
      const itemType = this.generateTypeDefinition(obj[0], `${name}Item`, 0);
      return `${itemType}[]`;
    }

    if (typeof obj === 'object') {
      const lines: string[] = [];
      lines.push(`interface ${name} {`);

      for (const [key, value] of Object.entries(obj)) {
        const propName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
          ? key
          : `"${key}"`;
        const propType = this.getType(value, this.capitalize(key));
        lines.push(`${spaces}  ${propName}: ${propType};`);
      }

      lines.push(`${spaces}}`);
      return lines.join('\n');
    }

    return typeof obj;
  }

  private getType(value: unknown, name: string): string {
    if (value === null) return 'null';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'unknown[]';
      return `${this.getType(value[0], name)}[]`;
    }
    if (typeof value === 'object') {
      return name;
    }
    return typeof value;
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
