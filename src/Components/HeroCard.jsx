export default function HeroCard({ hero }) {
  return (
    <div className="w-[260px] h-[360px] border-4 border-gray-400 rounded-lg flex" style={{ background: `url(${hero?.image?.url}) center/cover` }}>
      <div className="self-end backdrop-blur-sm w-full flex justify-between items-center py-4 px-1 text-[#e2d7d7]">
        <article className="text-center self-end">
          <p className="text-sm font-semibold">combat</p>
          <h2 className={hero?.powerstats?.combat !== 'null' ? 'text-xl font-semibold' : 'text-sm font-semibold'}>{hero?.powerstats?.combat === 'null' ? '???' : hero?.powerstats?.combat}</h2>
        </article>
        <article className="text-center">
          <h1 className="text-lg font-semibold">{hero?.name}</h1>
          <p className="text-sm">{hero?.biography['full-name']}</p>
        </article>
        <article className="text-center self-end">
          <p className="text-sm font-semibold">power</p>
          <h2 className={hero?.powerstats?.power !== 'null' ? 'text-xl font-semibold' : 'text-sm font-semibold'}>{hero?.powerstats?.power === 'null' ? '???' : hero.powerstats.power}</h2>
        </article>
      </div>
    </div>
  )
}
