import bcrypt from 'bcryptjs';
import { Schema, model, Types } from 'mongoose';

import { Credential } from '../models/credential';

export const credentialSchema = new Schema<Credential>(
	{
		username: { type: String, required: true, unique: true, trim: true },
		hashedPassword: { type: String, required: true },
	},
	{ collection: 'credentials' }
);

credentialSchema.virtual('folders', {
	ref: 'Folder',
	localField: '_id',
	foreignField: 'userId',
});

credentialSchema.set('toJSON', { virtuals: true });
credentialSchema.set('toObject', { virtuals: true });

export const credentialModel = model<Credential>(
	'Credential',
	credentialSchema
);

export async function create(
	username: string,
	password: string
): Promise<Types.ObjectId> {
	return credentialModel
		.find({ username })
		.then((found: Credential[]) => {
			if (found.length) throw `Username exists: ${username}`;
		})
		.then(() =>
			bcrypt
				.genSalt(10)
				.then((salt: string) => bcrypt.hash(password, salt))
				.then((hashedPassword: string) => {
					const creds = new credentialModel({
						username,
						hashedPassword,
					});
					creds.save();
					return creds._id;
				})
		);
}

export async function verify(
	username: string,
	password: string
): Promise<Types.ObjectId> {
	return credentialModel
		.find({ username })
		.then((found) => {
			if (!found || found.length !== 1)
				throw 'Invalid username or password';
			return found[0];
		})
		.then((credsOnFile: Credential) =>
			bcrypt
				.compare(password, credsOnFile.hashedPassword)
				.then((result: boolean) => {
					if (!result) throw 'Invalid username or password';
					if (!credsOnFile._id) throw 'Invalid credentials';
					return credsOnFile._id;
				})
		);
}

export default { create, verify };
