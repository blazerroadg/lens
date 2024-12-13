


```
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Job_Shift_Hours')
export class JobShiftHours {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jobId: number;

  @Column({ type: 'smallint' })
  shift: number;

  @Column({ type: 'smallint', nullable: true })
  mondayPlan: number;

  @Column({ type: 'smallint', nullable: true })
  tuesdayPlan: number;

  @Column({ type: 'smallint', nullable: true })
  wednesdayPlan: number;

  @Column({ type: 'smallint', nullable: true })
  thursdayPlan: number;

  @Column({ type: 'smallint', nullable: true })
  fridayPlan: number;

  @Column({ type: 'smallint', nullable: true })
  saturdayPlan: number;
}


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobShiftHours } from './job-shift-hours.entity';

@Injectable()
export class JobShiftHoursService {
  constructor(
    @InjectRepository(JobShiftHours)
    private readonly jobShiftHoursRepository: Repository<JobShiftHours>,
  ) {}

  // Get by jobId
  async getByJobId(jobId: number): Promise<JobShiftHours[]> {
    return await this.jobShiftHoursRepository.find({ where: { jobId } });
  }

  // Insert a new record
  async insert(data: Partial<JobShiftHours>): Promise<JobShiftHours> {
    const newRecord = this.jobShiftHoursRepository.create(data);
    return await this.jobShiftHoursRepository.save(newRecord);
  }

  // Update an existing record
  async update(id: number, data: Partial<JobShiftHours>): Promise<JobShiftHours> {
    const existingRecord = await this.jobShiftHoursRepository.findOneBy({ id });
    if (!existingRecord) {
      throw new Error('Record not found');
    }
    const updatedRecord = this.jobShiftHoursRepository.merge(existingRecord, data);
    return await this.jobShiftHoursRepository.save(updatedRecord);
  }
}


import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { JobShiftHoursService } from './job-shift-hours.service';
import { JobShiftHours } from './job-shift-hours.entity';

@Controller('job-shift-hours')
export class JobShiftHoursController {
  constructor(private readonly service: JobShiftHoursService) {}

  @Get(':jobId')
  async getByJobId(@Param('jobId') jobId: number): Promise<JobShiftHours[]> {
    return this.service.getByJobId(jobId);
  }

  @Post()
  async insert(@Body() data: Partial<JobShiftHours>): Promise<JobShiftHours> {
    return this.service.insert(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<JobShiftHours>,
  ): Promise<JobShiftHours> {
    return this.service.update(id, data);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobShiftHours } from './job-shift-hours.entity';
import { JobShiftHoursService } from './job-shift-hours.service';
import { JobShiftHoursController } from './job-shift-hours.controller';

@Module({
  imports: [TypeOrmModule.forFeature([JobShiftHours])],
  providers: [JobShiftHoursService],
  controllers: [JobShiftHoursController],
})
export class JobShiftHoursModule {}




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
