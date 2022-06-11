# node-ls

The program that imitates 'ls' command line in Bash, with a possibility of customization.

It is still under development, so it does require a couple of steps before using it. The steps are:

1. package.json "bin" section
2. chmod +x index.js - Changing index.js file permissions
3. '#!/usr/bin/env node' at the top -  Allow this file to be treated as executable
4. npm link - Link project to be able to use it everywhere
