import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    console.log('createPropertyDto', createPropertyDto);
    return this.propertyService.create(createPropertyDto);
  }

  @Get()
  findAll() {
    return this.propertyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePropertyDto: any) {
    return this.propertyService.update(id, updatePropertyDto);
  }
}
