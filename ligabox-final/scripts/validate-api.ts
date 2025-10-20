#!/usr/bin/env tsx
/**
 * API Structure Validation Script
 * Validates that all required files and endpoints are present
 */

import { existsSync } from 'fs';
import { join } from 'path';

const BASE_PATH = process.cwd();

interface ValidationResult {
  name: string;
  passed: boolean;
  message?: string;
}

const results: ValidationResult[] = [];

function checkFile(path: string, description: string): void {
  const fullPath = join(BASE_PATH, path);
  const exists = existsSync(fullPath);
  results.push({
    name: description,
    passed: exists,
    message: exists ? undefined : `File not found: ${path}`,
  });
}

console.log('🔍 Validating API Implementation Structure...\n');

// Check Models
console.log('📦 Checking Models...');
checkFile('server/models/User.ts', 'User Model');
checkFile('server/models/Fighter.ts', 'Fighter Model');
checkFile('server/models/Event.ts', 'Event Model');
checkFile('server/models/Fight.ts', 'Fight Model');
checkFile('server/models/Article.ts', 'Article Model');
checkFile('server/models/WeightClass.ts', 'WeightClass Model');

// Check Controllers
console.log('🎮 Checking Controllers...');
checkFile('server/controllers/authController.ts', 'Auth Controller');
checkFile('server/controllers/fightersController.ts', 'Fighters Controller');
checkFile('server/controllers/eventsController.ts', 'Events Controller');
checkFile('server/controllers/fightsController.ts', 'Fights Controller');
checkFile('server/controllers/rankingsController.ts', 'Rankings Controller');
checkFile('server/controllers/articlesController.ts', 'Articles Controller');

// Check Routes
console.log('🛣️  Checking Routes...');
checkFile('server/routes/auth.ts', 'Auth Routes');
checkFile('server/routes/fighters.ts', 'Fighters Routes');
checkFile('server/routes/events.ts', 'Events Routes');
checkFile('server/routes/fights.ts', 'Fights Routes');
checkFile('server/routes/rankings.ts', 'Rankings Routes');
checkFile('server/routes/articles.ts', 'Articles Routes');

// Check Middleware
console.log('🔧 Checking Middleware...');
checkFile('server/middleware/auth.ts', 'Auth Middleware');
checkFile('server/middleware/errorHandler.ts', 'Error Handler Middleware');

// Check Config
console.log('⚙️  Checking Configuration...');
checkFile('server/config/database.ts', 'Database Config');
checkFile('.env.example', 'Environment Example');

// Check Main Server
console.log('🚀 Checking Server...');
checkFile('server/api/server.ts', 'Main Server');

// Check Utils
console.log('🛠️  Checking Utilities...');
checkFile('server/utils/seed.ts', 'Seed Script');

// Check Documentation
console.log('📚 Checking Documentation...');
checkFile('API_DOCUMENTATION.md', 'API Documentation');
checkFile('README_API.md', 'API README');

// Check Tests
console.log('🧪 Checking Tests...');
checkFile('tests/api-tests.http', 'HTTP Tests');
checkFile('tests/socket-client-example.ts', 'Socket.IO Example');

// Print Results
console.log('\n' + '='.repeat(60));
console.log('📊 VALIDATION RESULTS');
console.log('='.repeat(60) + '\n');

const passed = results.filter((r) => r.passed).length;
const failed = results.filter((r) => !r.passed).length;

results.forEach((result) => {
  const icon = result.passed ? '✅' : '❌';
  console.log(`${icon} ${result.name}`);
  if (result.message) {
    console.log(`   ${result.message}`);
  }
});

console.log('\n' + '='.repeat(60));
console.log(`Total: ${results.length} | Passed: ${passed} | Failed: ${failed}`);
console.log('='.repeat(60) + '\n');

if (failed === 0) {
  console.log('🎉 All validation checks passed!\n');
  console.log('Next steps:');
  console.log('1. Ensure MongoDB is running');
  console.log('2. Run: npm run seed');
  console.log('3. Run: npm run server');
  console.log('4. Test endpoints using tests/api-tests.http\n');
  process.exit(0);
} else {
  console.log('❌ Some validation checks failed. Please review the errors above.\n');
  process.exit(1);
}
