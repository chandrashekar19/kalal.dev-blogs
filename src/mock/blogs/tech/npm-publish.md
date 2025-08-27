# 📦 Automating NPM Package Publishing with GitHub Actions

This guide shows you how to automate the **CI/CD build process** for publishing an npm package using **GitHub Actions**.

---

## 1️⃣ Initialize Your Project

You can start with any setup (for example, `react + vite`).

Then, clean up your project for packaging:

```sh
rm -rf src public assets
2️⃣ Update package.json
Modify your package.json to match your npm package requirements.

Example changes:

json
Copy code
{
  "name": "your-package-name",
  "version": "1.0.0",
  "main": "index.js",
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/your-repo.git"
  }
}
3️⃣ Create GitHub Actions Workflow
Inside your repo, create a workflow file:

📂 .github/workflows/publish-npm.yml

yaml
Copy code
name: "publish npm 🚀"

on:
  push:
    branches:
      - master

jobs:
  release:
    name: publish
    runs-on: ubuntu-latest

    steps:
      - name: checkout
        uses: actions/checkout@v2

      - name: setup node
        uses: actions/setup-node@v1
        with:
          node-version: 18
          registry-url: https://registry.npmjs.org

      - name: publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: npm publish --access public
4️⃣ Create an NPM Token
Log in to npmjs.com.

Go to Access Tokens and create a Classic Token.

Copy it immediately (it expires if not copied).

5️⃣ Add Secret to GitHub
Open your GitHub repo.

Go to Settings → Secrets and Variables → Actions → New Repository Secret.

Add:

makefile
Copy code
Name: NPM_TOKEN
Value: <your token>
6️⃣ Authenticate Locally (Optional)
Run:

sh
Copy code
npm login
7️⃣ Push and Publish 🚀
Commit and push your code:

sh
Copy code
git add .
git commit -m "chore: setup npm publish workflow"
git push origin master
Now go to GitHub → Actions and check your workflow run.

✅ If the workflow succeeds, your package will be automatically published to npm.

🎉 Done!
From now on, every push to master will auto-publish your npm package.
```
