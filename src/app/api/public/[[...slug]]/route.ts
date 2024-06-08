import fs from "fs";
import { parse } from 'url';
import { join } from 'path';

export async function GET(req: Request) {
	const { pathname } = parse(req.url || '', true);
	if (!pathname) {
		return new Response(JSON.stringify({ error: 'Missing slug parameter' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
	}

	const fileUrl = pathname.replace(/^\/api\/public\//, ''); // Remove '/api/public/' from the beginning of the URL
	const publicDir = join(process.cwd(), "/public/");
	try {
		const data = await fs.promises.readFile(join(publicDir, fileUrl));
		const fileExtension = fileUrl.split('.').pop()?.toLowerCase();

		let contentType = '';
		if (fileExtension === '.jpg' || fileExtension === '.jpeg' || fileExtension === '.png') {
			contentType = 'image/jpeg'; // or 'image/png' based on the file extension
		} else if (fileExtension === '.pdf') {
			contentType = 'application/pdf';
		}

		return new Response(data, { headers: { 'Content-type': contentType } });
	} catch (error) {
		return new Response(JSON.stringify({ error: "File not found" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
	}
}
