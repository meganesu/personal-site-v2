CUSTOM_DOMAIN="meganesulli.com"

echo "Commit: $TRAVIS_COMMIT"
echo "Message: $TRAVIS_COMMIT_MESSAGE"

# Create CNAME file for hosting GitHub Pages site at a custom domain
echo $CUSTOM_DOMAIN > public/CNAME

npx gh-pages -d public -b master -r "https://$GITHUB_TOKEN@github.com/meganesu/meganesu.github.io.git" -m "$TRAVIS_COMMIT_MESSAGE ($TRAVIS_COMMIT)"