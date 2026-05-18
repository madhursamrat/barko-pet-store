const { execSync } = require('child_process');
try {
  const result = execSync('npx -y wrangler pages deploy . --project-name=barko-pet-store', { encoding: 'utf8', stdio: 'inherit' });
  console.log(result);
} catch(e) {
  console.log('Error:', e.message);
}