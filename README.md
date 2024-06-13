

// security.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Security {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  group_id: number;
}

// group-menu.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GroupMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  group_id: number;

  @Column()
  menu_id: number;
}

// menu-text.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MenuText {
  @PrimaryGeneratedColumn()
  menu_id: number;

  @Column()
  text: string;
}

// menu-parent.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MenuParent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  menu_id: number;

  @Column()
  parent_id: number;
}


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Security } from './security.entity';
import { GroupMenu } from './group-menu.entity';
import { MenuText } from './menu-text.entity';
import { MenuParent } from './menu-parent.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Security)
    private securityRepository: Repository<Security>,
    @InjectRepository(GroupMenu)
    private groupMenuRepository: Repository<GroupMenu>,
    @InjectRepository(MenuText)
    private menuTextRepository: Repository<MenuText>,
    @InjectRepository(MenuParent)
    private menuParentRepository: Repository<MenuParent>,
  ) {}

  async getMenuHierarchy(username: string, parentId: number): Promise<MenuText[]> {
    // Step 1: Get group_ids for the user
    const groupIds = await this.securityRepository.find({
      where: { username },
      select: ['group_id'],
    });

    const groupIdArray = groupIds.map((group) => group.group_id);

    // Step 2: Get menu_ids for the group_ids
    const menuIds = await this.groupMenuRepository.find({
      where: { group_id: groupIdArray },
      select: ['menu_id'],
    });

    const menuIdArray = menuIds.map((menu) => menu.menu_id);

    // Step 3: Get hierarchical menu items starting from the given parent_id
    const menuTexts = await this.menuTextRepository.createQueryBuilder('mt')
      .innerJoin('menu_parent', 'mp1', 'mt.menu_id = mp1.menu_id')
      .leftJoin('menu_parent', 'mp2', 'mp1.menu_id = mp2.parent_id')
      .leftJoin('menu_parent', 'mp3', 'mp2.menu_id = mp3.parent_id')
      .leftJoin('menu_parent', 'mp4', 'mp3.menu_id = mp4.parent_id')
      .leftJoin('menu_parent', 'mp5', 'mp4.menu_id = mp5.parent_id')
      .where('mp1.parent_id = :parentId', { parentId })
      .andWhere('mt.menu_id IN (:...menuIdArray)', { menuIdArray })
      .getMany();

    return menuTexts;
  }
}

import { Controller, Get, Param } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get(':username/:parentId')
  async getMenuHierarchy(@Param('username') username: string, @Param('parentId') parentId: number) {
    return this.menuService.getMenuHierarchy(username, parentId);
  }
}



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
