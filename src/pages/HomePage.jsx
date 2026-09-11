import { Link } from "react-router-dom";
import { useCountUp } from "../hooks/useCountUp.js";

export function HomePage() {
  const statsRef = useCountUp();

  return (
    <>
      <main className="hero" id="home">
        <div className="hero-inner">
          <div className="trust-row anim" id="capabilities" style={{ "--d": "0.05s" }}>
            <div className="skill-badge badge-one"><span>剧</span></div>
            <div className="skill-badge badge-two"><span>广</span></div>
            <div className="skill-badge badge-three"><span>制</span></div>
            <div className="trust-pill">短剧与广告一体化制作</div>
          </div>

          <h1 className="headline">
            <span>让想象，</span>
            <span>直接开拍</span>
          </h1>

          <p className="subhead anim" style={{ "--d": "0.28s" }}>
            幻核动漫专注<span>人工智能短剧制作</span>与<span>广告商单制作</span>，从创意策划、角色开发到镜头生成与成片交付，让好故事更快抵达观众。
          </p>

          <Link className="primary-cta anim" style={{ "--d": "0.4s" }} to="/contact">
            开始合作
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </main>

      <footer ref={statsRef} className="stats" id="proof" aria-label="制作能力">
        <div className="stat anim" style={{ "--d": "0.5s" }}>
          <span className="stat-symbol">◆</span>
          <strong><span className="count" data-target="120" data-decimals="0">0</span><span className="suffix">＋</span></strong>
          <small>项目交付</small>
        </div>
        <div className="stat anim" style={{ "--d": "0.58s" }}>
          <span className="stat-symbol">◎</span>
          <strong><span className="count" data-target="12" data-decimals="0">0</span><span className="suffix">道</span></strong>
          <small>标准流程</small>
        </div>
        <div className="stat anim" style={{ "--d": "0.66s" }}>
          <span className="stat-symbol">✦</span>
          <strong><span className="count" data-target="24" data-decimals="0">0</span><span className="suffix">小时</span></strong>
          <small>快速响应</small>
        </div>
        <div className="stat anim" style={{ "--d": "0.74s" }}>
          <span className="stat-symbol">▦</span>
          <strong><span className="count" data-target="30" data-decimals="0">0</span><span className="suffix">＋</span></strong>
          <small>题材覆盖</small>
        </div>
      </footer>
    </>
  );
}
