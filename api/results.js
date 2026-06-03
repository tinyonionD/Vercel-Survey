const K = process.env.KV_REST_API_URL;
const T = process.env.KV_REST_API_TOKEN;
async function k(cmd,...a){
  const r=await fetch(K,{method:'POST',headers:{Authorization:'Bearer '+T,'Content-Type':'application/json'},body:JSON.stringify([cmd,...a])});
  return r.json();
}
const N={1:'射箭/射击/激光打靶',2:'真人CS/卡丁车',3:'匹克球',4:'排球/巨型排球/网球',5:'皮划艇/桨板',6:'飞盘/放风筝',7:'攀岩',8:'趣味接力/旱地龙舟/泡泡足球',9:'户外骑行/露营野餐',10:'保龄球',11:'羽毛球/乒乓球',12:'台球/躲避球',13:'密室逃脱',14:'剧本杀',15:'VR体验',16:'沉浸式剧场/鬼屋',17:'KTV',18:'桌游/麻将',19:'手作DIY',20:'观影会/茶话会',21:'轰趴小游戏'};
const C={1:'户外运动竞技类',2:'室内球类休闲类',3:'沉浸式互动体验类',4:'休闲文娱放松类'};
const A={1:[1,2,3,4,5,6,7,8,9],2:[10,11,12],3:[13,14,15,16],4:[17,18,19,20,21]};
export default async function h(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  if(!K||!T)return res.json({ok:false,error:'no KV',total_votes:0,categories:{}});
  let t=0;const cnt={};
  for(let i=1;i<=21;i++){const r=await k('LLEN','vote:'+i);const n=parseInt(r?.result??0);cnt[i]=n;t+=n;}
  const cats={};
  for(const[c,aids]of Object.entries(A)){let cc=0;const acts=aids.map(aid=>{const n=cnt[aid];cc+=n;return{id:aid,name:N[aid],count:n,pct:t?Math.round(n/t*100):0};});cats[c]={name:C[c],count:cc,pct:t?Math.round(cc/t*100):0,activities:acts};}
  res.json({ok:true,total_votes:t,categories:cats});
}
