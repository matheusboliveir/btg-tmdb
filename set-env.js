const fs = require('fs');

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `
export const environment = {
  production: true,
  apiUrl: 'https://api.themoviedb.org/3',
  tmdbApiKey: '${process.env.TMDB_API_KEY}'
};
`;

fs.writeFileSync(targetPath, envConfigFile, { encoding: 'utf-8' });
