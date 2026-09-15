import { useState } from "react";
import { Link } from "react-router-dom";
import { caseVideos } from "../content/cases.js";

const caseCategories = ["全部", "仿真人", "2D动漫", "3D动漫", "游戏广告", "商业广告", "文旅影像"];

function EmptyCases({ category = "全部" }) {
  const isAll = category === "全部";

  return (
    <section className="case-showcase" aria-labelledby="case-coming-title">
      <div className="case-stage" aria-hidden="true">
        <span className="case-index">精选</span>
        <span className="case-light" />
        <span className="case-stamp">作品整理中</span>
      </div>
      <div className="case-copy">
        <p className="case-status"><span aria-hidden="true" />案例片库筹备中</p>
        <h2 id="case-coming-title">{isAll ? "精选项目即将呈现" : `${category}作品正在整理`}</h2>
        <p>{isAll ? "真实案例与样片正在整理。需要了解对应题材、画面风格或制作能力，可直接与我们沟通。" : "该分类暂无公开作品，需要定向样片可直接与我们沟通。"}</p>
        <Link className="text-link" to="/contact">联系获取样片<span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  );
}

function CaseCard({ item }) {
  const [playing, setPlaying] = useState(false);
  const orientationClass = item.orientation === "竖屏" ? "case-card-portrait" : "case-card-landscape";

  return (
    <article className={`case-card ${orientationClass}`}>
      <div className="case-media">
        {playing ? (
          <video
            className="case-video"
            src={item.videoSrc}
            poster={item.posterSrc || undefined}
            aria-label={`正在播放${item.title}`}
            controls
            autoPlay
            playsInline
            preload="metadata"
          />
        ) : (
          <>
            {item.posterSrc ? (
              <img src={item.posterSrc} alt={`${item.title}封面`} loading="lazy" />
            ) : (
              <div className="case-poster-fallback" aria-hidden="true"><span>作品封面</span></div>
            )}
            <button
              className="case-play"
              type="button"
              aria-label={`播放${item.title}`}
              onClick={() => setPlaying(true)}
            >
              <span aria-hidden="true">▶</span>
              播放作品
            </button>
          </>
        )}
      </div>

      <div className="case-meta">
        <div className="case-details">
          <span>{item.category}</span>
          {item.duration && <span>{item.duration}</span>}
        </div>
        <h2>{item.title}</h2>
        <p>{item.summary}</p>
        {playing && (
          <button
            className="case-collapse"
            type="button"
            aria-label={`收起${item.title}`}
            onClick={() => setPlaying(false)}
          >
            收起作品
          </button>
        )}
      </div>
    </article>
  );
}

export function CasesPage({ items = caseVideos }) {
  const [activeCategory, setActiveCategory] = useState("全部");
  const visibleItems = activeCategory === "全部"
    ? items
    : items.filter((item) => item.category === activeCategory);

  return (
    <main className="route-page route-cases">
      <div className="route-shell cases-shell">
        <header className="route-intro">
          <p className="route-kicker"><span aria-hidden="true" />作品案例</p>
          <h1>每一帧，都为传播服务</h1>
          <p>用叙事、角色与视觉风格，让内容拥有被看见和被记住的理由。</p>
        </header>

        <div className="case-filters" role="group" aria-label="作品分类">
          {caseCategories.map((category) => (
            <button
              type="button"
              key={category}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {visibleItems.length > 0 ? (
          <section className="case-gallery" aria-label="作品列表">
            {visibleItems.map((item) => <CaseCard item={item} key={item.id} />)}
          </section>
        ) : <EmptyCases category={activeCategory} />}
      </div>
    </main>
  );
}
