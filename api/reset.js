const K=process.env.KV_REST_API_URL,T=process.env.KV_REST_API_TOKEN;
export default async function h(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  if(!K||!T)return res.status(500).json({ok:false});
  if(req.method==='OPTIONS')return res.status(200).end();
  const pl=[];for(let i=1;i<=21;i++)pl.push(['DEL','vote:'+i]);
  await fetch(K,{method:'POST',headers:{Authorization:'Bearer '+T,'Content-Type':'application/json'},body:JSON.stringify(pl)});
  res.json({ok:true});
}
