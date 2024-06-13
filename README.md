async getMenuHierarchy(username: string, parentId: number): Promise<any> {
  // Step 1: Get group_ids for the user
  const groupIds = await this.securityRepository.find({
    where: { username },
    select: ['group_id'],
  });

  const groupIdArray = groupIds.map(group => group.group_id);

  // Step 2: Get menu_ids for the group_ids using In operator
  const menuIds = await this.groupMenuRepository.find({
    where: { group_id: In(groupIdArray) },
    select: ['menu_id'],
  });

  const menuIdArray = menuIds.map(menu => menu.menu_id);

  // Step 3: Initialize the results array and a queue for BFS
  const results = [];
  const queue = [{ menu_id: parentId, parent_id: null }];
  
  // Step 4: Perform BFS to traverse the tree structure
  while (queue.length > 0) {
    const current = queue.shift();
    
    // Find all children of the current node
    const children = await this.menuParentRepository.createQueryBuilder('mp')
      .innerJoinAndSelect('menu_text', 'mt', 'mt.menu_id = mp.menu_id')
      .where('mp.parent_id = :parentId', { parentId: current.menu_id })
      .andWhere('mp.menu_id IN (:...menuIdArray)', { menuIdArray })
      .getMany();
    
    // Add current node to results
    results.push({
      menu_id: current.menu_id,
      parent_id: current.parent_id,
      text: current.text
    });
    
    // Add children to the queue
    for (const child of children) {
      queue.push({
        menu_id: child.menu_id,
        parent_id: child.parent_id,
        text: child.mt.text
      });
    }
  }
  
  // Convert results to tree format
  const tree = [];
  const map = {};
  
  results.forEach(node => {
    map[node.menu_id] = { ...node, children: [] };
    if (node.parent_id === null) {
      tree.push(map[node.menu_id]);
    } else {
      map[node.parent_id].children.push(map[node.menu_id]);
    }
  });
  
  return tree;
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
