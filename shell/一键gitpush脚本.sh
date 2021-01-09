if [ -n "$1" ]
then
  commitMessage="$1"
else
  commitMessage=$(date)
fi
echo $commitMessage
git add .
git commit -m "$commitMessage"
git push

# chomd a+x simplePush
# alias simplePush=./simpleGitPush.sh
