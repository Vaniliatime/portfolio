import sharp from "sharp";

const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'>
  <defs>
    <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#fbfafd'/>
      <stop offset='55%' stop-color='#f4efff'/>
      <stop offset='100%' stop-color='#e7d9ff'/>
    </linearGradient>
    <radialGradient id='glow' cx='0.84' cy='0.16' r='0.62'>
      <stop offset='0%' stop-color='#a855f7' stop-opacity='0.38'/>
      <stop offset='100%' stop-color='#a855f7' stop-opacity='0'/>
    </radialGradient>
  </defs>

  <rect width='1200' height='630' fill='url(#bg)'/>
  <rect width='1200' height='630' fill='url(#glow)'/>
  <rect width='1200' height='12' fill='#7c3aed'/>

  <text x='96' y='236' font-family='Segoe UI, Arial, sans-serif' font-size='34' font-weight='600' fill='#7c3aed' letter-spacing='7'>KKASZUBA.EU</text>
  <text x='96' y='344' font-family='Segoe UI, Arial, sans-serif' font-size='78' font-weight='700' fill='#16131f'>Krzysztof Kaszuba</text>
  <text x='96' y='412' font-family='Segoe UI, Arial, sans-serif' font-size='38' fill='#5c5670'>Web developer and IT support specialist</text>

  <rect x='96' y='476' width='72' height='4' rx='2' fill='#7c3aed' opacity='0.5'/>
  <text x='96' y='534' font-family='Segoe UI, Arial, sans-serif' font-size='30' fill='#5c5670'>Websites, web apps, and the upkeep after launch</text>
</svg>`;

const info = await sharp(Buffer.from(svg)).png().toFile("public/og.png");
console.log(`og.png ${info.width}x${info.height} ${Math.round(info.size / 1024)}KB`);
