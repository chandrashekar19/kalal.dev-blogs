# Essential Git Commands Cheat Sheet for Developers

Git is an essential tool for modern software development. After years of using Git in various projects, I've compiled this comprehensive cheat sheet of commands that every developer should master.

## Repository Management

### Initializing and Cloning

```bash
# Initialize a new Git repository
git init

# Clone a repository into a new directory
git clone [url]

# Clone a specific branch
git clone -b [branch-name] [url]

# Clone with a different directory name
git clone [url] [directory-name]
Basic Configuration
bash
Copy code
# Set global username and email
git config --global user.name "[name]"
git config --global user.email "[email]"

# Set local username and email for current repo
git config user.name "[name]"
git config user.email "[email]"

# View configuration
git config --list
git config user.name
git config user.email
Daily Workflow Commands
Staging and Committing
bash
Copy code
# Add a file or changes to staging area
git add [file]

# Add all changes to staging area
git add .
git add -A

# Add all tracked files (excludes new files)
git add -u

# Commit staged changes with a message
git commit -m "[descriptive message]"

# Commit all tracked changes (skip staging)
git commit -am "[message]"

# Amend the last commit
git commit --amend
git commit --amend -m "[new message]"
Checking Status and History
bash
Copy code
# Display the status of the working directory
git status

# Show short status
git status -s

# Display commit logs
git log

# Show compact log with one line per commit
git log --oneline

# Show log with graph visualization
git log --graph --oneline --all

# Show specific number of commits
git log -n 5
Branch Management
Creating and Switching Branches
bash
Copy code
# List all local branches
git branch

# List all branches (local and remote)
git branch -a

# Create a new branch
git branch [branch-name]

# Create and switch to a new branch
git checkout -b [branch-name]

# Switch to an existing branch
git checkout [branch-name]

# Switch to the previous branch
git checkout -

# Delete a local branch
git branch -d [branch-name]

# Force delete a local branch
git branch -D [branch-name]
Modern Branch Commands (Git 2.23+)
bash
Copy code
# Switch to an existing branch
git switch [branch-name]

# Create and switch to a new branch
git switch -c [branch-name]

# Switch to the previous branch
git switch -
Remote Repository Operations
Working with Remotes
bash
Copy code
# List remote repositories
git remote -v

# Add a new remote repository
git remote add [name] [url]

# Remove a remote repository
git remote remove [name]

# Rename a remote
git remote rename [old-name] [new-name]

# Change remote URL
git remote set-url [name] [new-url]
Synchronizing with Remote
bash
Copy code
# Upload local repository content to remote
git push

# Push to specific remote and branch
git push [remote] [branch]

# Push and set upstream branch
git push -u [remote] [branch]

# Push all tags
git push --tags

# Fetch changes from remote (doesn't merge)
git fetch [remote]

# Fetch and prune deleted remote branches
git fetch --prune

# Pull changes from remote and merge
git pull

# Pull with rebase instead of merge
git pull --rebase
Merging and Rebasing
Merging Branches
bash
Copy code
# Merge a branch into the current branch
git merge [branch]

# Merge without fast-forward
git merge --no-ff [branch]

# Abort a merge in progress
git merge --abort

# Continue merge after resolving conflicts
git merge --continue
Rebasing
bash
Copy code
# Rebase current branch onto another branch
git rebase [branch]

# Interactive rebase for last n commits
git rebase -i HEAD~[n]

# Continue rebase after resolving conflicts
git rebase --continue

# Abort rebase and return to original state
git rebase --abort

# Skip current commit during rebase
git rebase --skip
Undoing Changes
Working Directory and Staging
bash
Copy code
# Discard changes in working directory
git checkout -- [file]
git restore [file]  # Git 2.23+

# Unstage a file (keep changes in working directory)
git reset [file]
git restore --staged [file]  # Git 2.23+

# Discard all changes in working directory
git checkout .
git restore .
Commit History
bash
Copy code
# Reset to a specific commit (soft reset)
git reset --soft [commit-hash]

# Reset to a specific commit (mixed reset - default)
git reset [commit-hash]

# Reset to a specific commit (hard reset - destructive)
git reset --hard [commit-hash]

# Reset to remote branch state
git reset --hard origin/[branch-name]

# Create a new commit that undoes changes
git revert [commit-hash]

# Revert a merge commit
git revert -m 1 [merge-commit-hash]
Advanced Commands
Stashing Changes
bash
Copy code
# Temporarily save changes without committing
git stash

# Stash with a message
git stash save "[message]"

# List all stashes
git stash list

# Apply the most recent stash
git stash apply

# Apply a specific stash
git stash apply stash@{n}

# Apply and remove the most recent stash
git stash pop

# Drop a specific stash
git stash drop stash@{n}

# Clear all stashes
git stash clear
Cherry-picking
bash
Copy code
# Apply a commit from another branch
git cherry-pick [commit-hash]

# Cherry-pick multiple commits
git cherry-pick [commit1] [commit2]

# Cherry-pick a range of commits
git cherry-pick [start-commit]..[end-commit]

# Cherry-pick without committing
git cherry-pick --no-commit [commit-hash]
Tagging
bash
Copy code
# Create a lightweight tag
git tag [tag-name]

# Create an annotated tag
git tag -a [tag-name] -m "[message]"

# List all tags
git tag

# Delete a tag
git tag -d [tag-name]

# Push tags to remote
git push --tags

# Push a specific tag
git push origin [tag-name]
Inspection and Comparison
Viewing Differences
bash
Copy code
# Show changes between working directory and staging
git diff

# Show changes between staging and last commit
git diff --staged
git diff --cached

# Show changes between two commits
git diff [commit1] [commit2]

# Show changes for a specific file
git diff [file]

# Show changes between branches
git diff [branch1]..[branch2]
File History
bash
Copy code
# Show commit history for a file
git log [file]

# Show changes for each commit of a file
git log -p [file]

# Show who last modified each line of a file
git blame [file]

# Show file content at a specific commit
git show [commit-hash]:[file-path]
Cleaning Up
Removing Files
bash
Copy code
# Remove file from working directory and staging
git rm [file]

# Remove file from staging only (keep in working directory)
git rm --cached [file]

# Remove untracked files
git clean -f

# Remove untracked files and directories
git clean -fd

# Preview what will be removed
git clean -n
Repository Maintenance
bash
Copy code
# Remove remote tracking branches that no longer exist
git remote prune origin

# Garbage collection and optimization
git gc

# Verify repository integrity
git fsck

# Show repository statistics
git count-objects -v
Useful Aliases
Add these to your Git configuration for faster workflows:

bash
Copy code
# Set up useful aliases
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
git config --global alias.lg "log --oneline --graph --all"
Pro Tips
Use .gitignore: Always create a comprehensive .gitignore file for your project

Atomic commits: Make small, focused commits with clear messages

Branch naming: Use descriptive branch names like feature/user-authentication

Commit messages: Follow conventional commit format for better history

Regular pulls: Pull frequently to avoid large merge conflicts

Backup branches: Create backup branches before risky operations

Emergency Commands
When things go wrong:

bash
Copy code
# Undo last commit but keep changes
git reset --soft HEAD~1

# Completely undo last commit
git reset --hard HEAD~1

# Recover deleted commits (shows reflog)
git reflog

# Reset to a state from reflog
git reset --hard HEAD@{n}

# Create a branch from a lost commit
git branch [branch-name] [commit-hash]
This cheat sheet covers the essential Git commands I use daily. Master these commands, and you'll be well-equipped to handle any Git workflow efficiently.
```
