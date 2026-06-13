import fs from 'fs';
import path from 'path';

function traverseDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            traverseDir(fullPath);
        } else if (fullPath.endsWith('.vue')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updatedContent = content.replace(/:to\s*=\s*(?:'|")\s*\{[\s\n]*name[\s\n]*:[\s\n]*(?:'|")([^'"]+)(?:'|")[\s\n]*\}\s*(?:'|")/g, (match, name) => {
                if (name === 'home' || name === 'home2' || name === 'home3') return 'to="/"';
                return `to="/${name}"`;
            });
            if (content !== updatedContent) {
                fs.writeFileSync(fullPath, updatedContent);
                console.log(`Updated ${fullPath}`);
            }
        }
    });
}

traverseDir('./app');
