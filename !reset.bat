call git checkout --orphan newBranch
call git add -A
call git commit -am "init"
call git branch -D master
call git branch -m master
call git push -f origin master
call git gc --aggressive --prune all