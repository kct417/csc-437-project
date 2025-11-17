import express, { Request, Response } from 'express';

import { connect } from './services/mongo';

import libraries from './routes/libraries';
import folders from './routes/folders';
import bookmarks from './routes/bookmarks';

import auth, { authenticateUser } from './routes/auth';

connect('Arcana');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || 'public';

app.use(express.static(staticDir));

app.get('/hello', (req: Request, res: Response) => {
	res.send('Hello, World');
});

app.use('/api/users', authenticateUser, libraries);
app.use('/api/folders', authenticateUser, folders);
app.use('/api/bookmarks', authenticateUser, bookmarks);

// app.use('/api/users', libraries);
// app.use('/api/folders', folders);
// app.use('/api/bookmarks', bookmarks);

app.use('/auth', auth);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
