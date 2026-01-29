import fs from 'fs';
import path from 'path';
import { PROFILES } from '../src/lib/data';

const outputPath = path.join(process.cwd(), 'scripts', 'seed-data.json');

try {
    console.log(`Extracting ${PROFILES.length} profiles from src/lib/data.ts...`);
    fs.writeFileSync(outputPath, JSON.stringify(PROFILES, null, 2));
    console.log(`✅ Successfully wrote data to ${outputPath}`);
} catch (error) {
    console.error('❌ Error writing data:', error);
    process.exit(1);
}
