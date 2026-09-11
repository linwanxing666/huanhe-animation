import { useState } from "react";
import { Link } from "react-router-dom";
import { caseVideos } from "../content/cases.js";

function EmptyCases() {
  return (
    <section className="case-showcase" aria-labelledby="case-coming-title">
      <div className="case-stage" aria-hidden="true">
        <span className="case-index">精选</span>
        <span className="case-light" />
        <span className="case-stamp">作品整理中</span>
      </div>
      <div className="case-copy">
        <p className="case-status"><span aria-hidden="true" />案例片库筹备中</p>
        <h2 id="case-coming-title">精选项目即将呈现</h2>
        <p>真实案例与样片正在整理。需要了解对应题材、画面风格或制作能力，可直接与我们沟通。</p>
        <Link className="text-link" to="/contact">联系获取样片<span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  );
}

function CaseCard({ item }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="case-card">
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
        <span>{item.category}</span>
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
  return (
    <main className="route-page route-cases">
      <div className="route-shell cases-shell">
        <header className="route-intro">
          <p className="route-kicker"><span aria-hidden="true" />作品案例</p>
          <h1>每一帧，都为传播服务</h1>
          <p>用叙事、角色与视觉风格，让内容拥有被看见和被记住的理由。</p>
        </header>

        {items.length > 0 ? (
          <section className="case-gallery" aria-label="作品列表">
            {items.map((item) => <CaseCard item={item} key={item.id} />)}
          </section>
        ) : <EmptyCases />}
      </div>
    </main>
  );
}
