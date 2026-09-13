import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { extname, join, normalize, basename } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { randomUUID } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';

const root = process.cwd();
const contentFile = join(root, 'admin-content.json');
const customPagesFile = join(root, 'custom-pages.json');
const productsFile = join(root, 'admin-products.json');
const databaseFile = process.env.ADMIN_DB_PATH || join(root, 'gajanan-admin.db');
const database = new DatabaseSync(databaseFile);
database.exec('CREATE TABLE IF NOT EXISTS enquiries (id TEXT PRIMARY KEY, created_at TEXT NOT NULL, status TEXT NOT NULL, payload TEXT NOT NULL);');
const exec = promisify(execFile);
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml', '.webp':'image/webp' };
const readBody = req => new Promise((resolve,reject)=>{let data='';req.on('data',chunk=>{data+=chunk;if(data.length>15_000_000)req.destroy()});req.on('end',()=>resolve(data));req.on('error',reject)});
const json = (res,status,body) => {res.writeHead(status,{'content-type':'application/json; charset=utf-8'});res.end(JSON.stringify(body))};
const clean = (value, limit=2000) => String(value || '').trim().replace(/[\u0000-\u001f\u007f]/g, ' ').slice(0,limit);
const email = value => clean(value,254).toLowerCase();
const getProducts = async () => { try { const products = JSON.parse(await readFile(productsFile,'utf8')); return Array.isArray(products) ? products : []; } catch (error) { if (error.code === 'ENOENT') return []; throw error; } };
const saveProducts = products => writeFile(productsFile,JSON.stringify(products,null,2)+'\n');
const getCustomPages = async () => { try { const pages = JSON.parse(await readFile(customPagesFile,'utf8')); return Array.isArray(pages) ? pages : []; } catch (error) { if (error.code === 'ENOENT') return []; throw error; } };
const saveCustomPages = pages => writeFile(customPagesFile,JSON.stringify(pages,null,2)+'\n');
const getInquiries = async () => database.prepare('SELECT payload FROM enquiries ORDER BY created_at DESC').all().map(row => JSON.parse(row.payload));
const saveInquiries = async items => { database.exec('BEGIN'); try { database.exec('DELETE FROM enquiries'); const insert = database.prepare('INSERT INTO enquiries (id, created_at, status, payload) VALUES (?, ?, ?, ?)'); for (const item of items) insert.run(item.id,item.createdAt,item.status,JSON.stringify(item)); database.exec('COMMIT'); } catch (error) { database.exec('ROLLBACK'); throw error; } };
const escapeHtml = value => String(value).replace(/[&<>'"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[character]));
const sendEnquiryEmail = async (inquiry) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { delivered:false, reason:'Email relay is not configured yet.' };
  const to = process.env.ENQUIRY_EMAIL || 'ssaivaraprasad51@gmail.com';
  const from = process.env.MAIL_FROM;
  if (!from) return { delivered:false, reason:'MAIL_FROM is not configured yet.' };
  const lines = [['Name',inquiry.name],['Email',inquiry.email],['Mobile',`${inquiry.phoneCode || ''} ${inquiry.phone || ''}`.trim() || 'Not provided'],['Company',inquiry.company || 'Not provided'],['Enquiry type',inquiry.type],['Country',inquiry.country || 'Not provided'],['Requirement',inquiry.message]].map(([label,value]) => `<tr><th align="left" style="padding:7px 14px 7px 0;vertical-align:top">${escapeHtml(label)}</th><td style="padding:7px 0">${escapeHtml(value)}</td></tr>`).join('');
  const response = await fetch('https://api.resend.com/emails', { method:'POST', headers:{Authorization:`Bearer ${apiKey}`,'content-type':'application/json'}, body:JSON.stringify({from,to,reply_to:inquiry.email,subject:`New ${inquiry.type} enquiry — ${inquiry.name}`,html:`<h2>New website enquiry</h2><table>${lines}</table>`}) });
  if (!response.ok) throw new Error(`Email provider returned ${response.status}.`);
  return { delivered:true };
};
const publishStudioContent = async () => {
  await exec('git',['add','admin-content.json','custom-pages.json'],{cwd:root});
  try { await stat(join(root,'uploads')); await exec('git',['add','uploads'],{cwd:root}); } catch (_) {}
  const { stdout:staged } = await exec('git',['diff','--cached','--name-only'],{cwd:root});
  if (!staged.trim()) return { published:false, message:'No new content changes to publish.' };
  await exec('git',['commit','-m','Publish Content Studio update'],{cwd:root});
  await exec('git',['push'],{cwd:root});
  return { published:true, message:'Saved to GitHub. The live website will refresh when GitHub Pages finishes deploying.' };
};

createServer(async (req,res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    if (req.method === 'GET' && url.pathname === '/api/products') return json(res,200,{items:await getProducts()});
    if (req.method === 'PUT' && url.pathname === '/api/products') { const body = JSON.parse(await readBody(req)); if (!Array.isArray(body.items)) return json(res,400,{error:'Products must be a list.'}); await saveProducts(body.items); return json(res,200,{ok:true}); }
    if (req.method === 'GET' && url.pathname === '/api/inquiries') return json(res,200,{items:await getInquiries()});
    if (req.method === 'POST' && url.pathname === '/api/inquiries') {
      const body = JSON.parse(await readBody(req));
      const inquiry = { id:randomUUID(), createdAt:new Date().toISOString(), status:'new', name:clean(body.name,120), email:email(body.email), phoneCode:clean(body.phoneCode,8), phone:clean(body.phone,30), company:clean(body.company,160), type:clean(body.type,80) || 'General enquiry', country:clean(body.country,100), message:clean(body.message,4000), mail:{delivered:false} };
      if (inquiry.name.length < 2) return json(res,400,{error:'Please enter your name.'});
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) return json(res,400,{error:'Please enter a valid email address.'});
      if (inquiry.phone.replace(/\D/g,'').length < 6) return json(res,400,{error:'Please enter a valid mobile number.'});
      if (inquiry.message.length < 8) return json(res,400,{error:'Please add a little more detail to your enquiry.'});
      const items = await getInquiries();
      try { inquiry.mail = await sendEnquiryEmail(inquiry); } catch (error) { inquiry.mail = { delivered:false, reason:error.message }; }
      items.unshift(inquiry); await saveInquiries(items);
      return json(res,201,{ok:true,mailSent:inquiry.mail.delivered});
    }
    if (req.method === 'PATCH' && /^\/api\/inquiries\/[^/]+$/.test(url.pathname)) {
      const id = decodeURIComponent(url.pathname.split('/').at(-1)); const body = JSON.parse(await readBody(req));
      const items = await getInquiries(); const inquiry = items.find(item => item.id === id);
      if (!inquiry) return json(res,404,{error:'Enquiry not found.'});
      if (!['new','in-progress','resolved'].includes(body.status)) return json(res,400,{error:'Invalid enquiry status.'});
      inquiry.status = body.status; inquiry.updatedAt = new Date().toISOString(); await saveInquiries(items);
      return json(res,200,{ok:true,item:inquiry});
    }
    if (req.method === 'POST' && url.pathname === '/api/content') {
      const content = JSON.parse(await readBody(req));
      if (!content || typeof content !== 'object' || Array.isArray(content)) return json(res,400,{error:'Content must be an object.'});
      await writeFile(contentFile, JSON.stringify(content,null,2)+'\n');
      const publication = await publishStudioContent();
      return json(res,200,{ok:true,...publication});
    }
    if (req.method === 'GET' && url.pathname === '/api/pages') return json(res,200,{items:await getCustomPages()});
    if (req.method === 'POST' && url.pathname === '/api/pages') {
      const body = JSON.parse(await readBody(req));
      const title = clean(body.title,100);
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'').slice(0,48);
      if (!slug || title.length < 2) return json(res,400,{error:'Enter a page name with at least two characters.'});
      const pages = await getCustomPages();
      if (pages.some(page => page.slug === slug)) return json(res,409,{error:'A page with this name already exists.'});
      const page = {slug,title,kicker:'GAJANAN INDUSTRIES',lead:'Add an introduction for this page.',body:['Add the first paragraph for this page.'],highlights:[['OUR STORY','Add a highlight']]};
      pages.push(page); await saveCustomPages(pages);
      const publication = await publishStudioContent();
      return json(res,201,{ok:true,item:page,...publication});
    }
    if (req.method === 'POST' && url.pathname === '/api/upload') {
      const { name='image.png', data='' } = JSON.parse(await readBody(req));
      const match = /^data:(image\/(?:png|jpeg|webp));base64,(.+)$/.exec(data);
      if (!match) return json(res,400,{error:'Upload a PNG, JPEG, or WebP image.'});
      const extension = match[1] === 'image/jpeg' ? '.jpg' : '.'+match[1].split('/')[1];
      const safe = basename(name, extname(name)).replace(/[^a-z0-9_-]/gi,'-').slice(0,60) || 'image';
      const filename = `${Date.now()}-${safe}${extension}`;
      await mkdir(join(root,'uploads'),{recursive:true});
      await writeFile(join(root,'uploads',filename),Buffer.from(match[2],'base64'));
      return json(res,200,{ok:true,path:`uploads/${filename}`});
    }
    if (req.method === 'POST' && url.pathname === '/api/publish') {
      const publication = await publishStudioContent();
      return json(res,200,{ok:true,...publication});
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') return json(res,405,{error:'Method not allowed.'});
    const pathname = url.pathname === '/' ? '/admin.html' : url.pathname;
    let file = normalize(join(root,decodeURIComponent(pathname)));
    if (!file.startsWith(root+ '/')) return json(res,403,{error:'Forbidden'});
    const fileStat = await stat(file);
    if (fileStat.isDirectory()) file = join(file,'index.html');
    await stat(file);
    res.writeHead(200,{'content-type':mime[extname(file).toLowerCase()]||'application/octet-stream','cache-control':'no-store'});
    if(req.method === 'HEAD') return res.end();
    createReadStream(file).pipe(res);
  } catch (error) {
    const message = error?.message || 'Server error';
    if (url.pathname.startsWith('/api/')) return json(res,500,{error:message});
    res.writeHead(error?.code === 'ENOENT' ? 404 : 500,{'content-type':'text/plain; charset=utf-8'});res.end(error?.code === 'ENOENT'?'Not found':message);
  }
}).listen(4173,'127.0.0.1',()=>console.log('Content Studio: http://localhost:4173/admin.html'));
