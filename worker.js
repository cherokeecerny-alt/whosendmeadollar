const TWO_HOURS=7200;
const J=(d,i={})=>{const h=new Headers(i.headers||{});h.set("content-type","application/json; charset=utf-8");h.set("cache-control","no-store");return new Response(JSON.stringify(d),{...i,headers:h})};
async function stats(e){return await e.JOINS.get("stats","json")||{total:0,countries:{}}}
export default{async fetch(r,e){const u=new URL(r.url);
if(u.pathname==="/api/stats"&&r.method==="GET")return J(await stats(e));
if(u.pathname==="/api/join"&&r.method==="POST"){const c=r.headers.get("cookie")||"";if(/(^|;\s*)joined_recently=1(?:;|$)/.test(c))return J({ok:true,counted:false});
const country=r.cf?.country||r.headers.get("CF-IPCountry")||"XX",s=await stats(e);s.total=(s.total||0)+1;s.countries=s.countries||{};s.countries[country]=(s.countries[country]||0)+1;await e.JOINS.put("stats",JSON.stringify(s));return J({ok:true,counted:true,total:s.total,country},{headers:{"Set-Cookie":`joined_recently=1; Max-Age=${TWO_HOURS}; Path=/; SameSite=Lax; Secure`}})}
return e.ASSETS.fetch(r)}};