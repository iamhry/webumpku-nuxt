import fs from 'fs';
import path from 'path';

function traverseDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            traverseDir(fullPath);
        } else if (fullPath.endsWith('.vue') || fullPath.endsWith('.ts') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updatedContent = content.replace(/router-link/g, 'NuxtLink');
            updatedContent = updatedContent.replace(/router\.push/g, 'navigateTo');
            if (content !== updatedContent) {
                fs.writeFileSync(fullPath, updatedContent);
                console.log(`Updated ${fullPath}`);
            }
        }
    });
}

traverseDir('./app');
