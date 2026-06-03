const K=process.env.KV_REST_API_URL,T=process.env.KV_REST_API_TOKEN;
async function k(cmd,...a){const r=await fetch(K,{method:'POST',headers:{Authorization:'Bearer '+T,'Content-Type':'application/json'},body:JSON.stringify([cmd,...a])});return r.json();}
export default async function h(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  if(!K||!T)return res.status(500).json({ok:false,error:'no KV'});
  if(req.method==='OPTIONS')return res.status(200).end();
  if(req.method!=='POST')return res.status(405).end();
  const{activities,voter_id}=req.body||{};
  if(!activities?.length)return res.status(400).json({ok:false});
  const vid=voter_id||'u'+Math.random().toString(36).slice(2,8);
  const pl=activities.map(a=>['LPUSH','vote:'+a,JSON.stringify({v:vid,t:Date.now()})]);
  await fetch(K,{method:'POST',headers:{Authorization:'Bearer '+T,'Content-Type':'application/json'},body:JSON.stringify(pl)});
  res.json({ok:true,voter_id:vid});
}
