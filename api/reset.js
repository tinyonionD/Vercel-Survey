const K=process.env.KV_REST_API_URL,T=process.env.KV_REST_API_TOKEN;
async function k(cmd,...a){
  const r=await fetch(K,{method:'POST',headers:{Authorization:'Bearer '+T,'Content-Type':'application/json'},body:JSON.stringify([cmd,...a])});
  return r.json();
}
export default async function h(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  if(!K||!T)return res.status(500).json({ok:false});
  if(req.method==='OPTIONS')return res.status(200).end();
  for(let i=1;i<=21;i++){
    await k('DEL','vote:'+i);
  }
  res.json({ok:true});
}
