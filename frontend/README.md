## The creation of the files in frontend is covered this tutorial series:
### Part 3A 
https://medium.com/@JeffWScott/python-smart-contract-dev-server-f81bd605a92c
### Part 3B
https://blog.lamden.io/a-frontend-for-your-smart-contract-part-b-e28a11dbdd8e

### Running the project

However you get the code, you can install dependencies and run the project in development mode with:

```bash
npm install
npm run dev
```

Open up [localhost:3000](http://localhost:3000)


## Production mode and deployment

To start a production version of your app, run `npm run build && npm start`. This will disable live reloading, and activate the appropriate bundler plugins.

You can deploy your application to any environment that supports Node 10 or above. As an example, to deploy to [Vercel Now](https://vercel.com) when using `sapper export`, run these commands:

```bash
npm install -g now
now
```

If your app can't be exported to a static site, you can use the [now-sapper](https://github.com/thgh/now-sapper) builder. You can find instructions on how to do so in its [README](https://github.com/thgh/now-sapper#basic-usage).
