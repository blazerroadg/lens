```

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Performance')
export class Performance {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the performance record' })
  id: number;

  @Column()
  @ApiProperty({ example: 'johndoe', description: 'The username of the employee' })
  username: string;

  @Column()
  @ApiProperty({ example: 'TypeA', description: 'The type of the company' })
  company_type: string;

  @Column()
  @ApiProperty({ example: 'DC1', description: 'Distribution Centre code' })
  DC: string;

  @Column()
  @ApiProperty({ example: 'TeamA', description: 'The team to which the employee belongs' })
  team: string;

  @Column()
  @ApiProperty({ example: '2024-08-28', description: 'The date of performance entry' })
  date: Date;

  @Column()
  @ApiProperty({ example: 'none', description: 'Any exemptions applicable' })
  exemption: string;

  @Column()
  @ApiProperty({ example: 'Job1', description: 'The job title' })
  job: string;

  @Column()
  @ApiProperty({ example: 10, description: 'The volume of work' })
  volume: number;

  @Column()
  @ApiProperty({ example: 8, description: 'Number of hours worked' })
  hours: number;

  @Column()
  @ApiProperty({ example: 2, description: 'Number of overtime hours' })
  overtime: number;

  @Column()
  @ApiProperty({ example: 'morning', description: 'Shift timing' })
  shift: string;

  @Column()
  @ApiProperty({ example: 'full-time', description: 'The schedule type' })
  schedule: string;

  @Column()
  @ApiProperty({ example: 'active', description: 'The status of the performance entry' })
  status: string;

  @Column()
  @ApiProperty({ example: 'admin', description: 'The user who updated the entry' })
  updated_by: string;

  @Column()
  @ApiProperty({ example: '2024-08-28', description: 'The date when the entry was updated' })
  updated_on: Date;

  @Column()
  @ApiProperty({ example: 'admin', description: 'The user who created the entry' })
  created_by: string;

  @Column()
  @ApiProperty({ example: '2024-08-28', description: 'The date when the entry was created' })
  created_on: Date;
}
import { Controller, Post, Body } from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { Performance } from './performance.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('performance')
@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @Post('insert')
  @ApiOperation({ summary: 'Insert multiple performance records' })
  @ApiResponse({ status: 201, description: 'The records have been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async insertItems(@Body() items: Performance[]): Promise<void> {
    await this.performanceService.insertItems(items);
  }
}



```


# Getting Started with Create React App

# LIVE DEMO
https://lens-20b4b.web.app/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
z
### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
