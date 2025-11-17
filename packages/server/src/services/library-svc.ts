import { Library } from '../models/library';
import { credentialModel } from './credential-svc';

export async function get(userId: string): Promise<Library> {
	const library = await credentialModel
		.findById(userId)
		.select('-hashedPassword')
		.populate('folders');

	if (!library) throw `${userId} not found`;
	return library as Library;
}

export default { get };
