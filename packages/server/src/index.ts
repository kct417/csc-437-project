import express, { Request, Response } from 'express';
import { connect } from './services/mongo';
import fs from 'node:fs/promises';
import path from 'path';

import libraries from './routes/libraries';
import folders from './routes/folders';
import bookmarks from './routes/bookmarks';
import { saveFile, getFile } from './services/filesystem';
import auth, { authenticateUser } from './routes/auth';

connect('Arcana');

const app = express();
app.use(express.json({ limit: '500kb' }));
app.use(express.raw({ type: 'image/*', limit: '32Mb' }));
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || 'public';

app.use(express.static(staticDir));

app.get('/hello', (req: Request, res: Response) => {
	res.send('Hello, World');
});

app.use('/api/users', authenticateUser, libraries);
app.use('/api/folders', authenticateUser, folders);
app.use('/api/bookmarks', authenticateUser, bookmarks);

app.post('/images', saveFile);
app.get('/images/:id', getFile);

app.use('/auth', auth);

app.use('/app', (req: Request, res: Response) => {
	const indexHtml = path.resolve(staticDir, 'index.html');
	fs.readFile(indexHtml, { encoding: 'utf8' }).then((html) => res.send(html));
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
