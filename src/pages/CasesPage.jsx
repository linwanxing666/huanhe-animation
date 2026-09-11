import { Link } from "react-router-dom";

export function CasesPage() {
  return (
    <main className="route-page route-cases">
      <div className="route-shell cases-shell">
        <header className="route-intro">
          <p className="route-kicker"><span aria-hidden="true" />作品案例</p>
          <h1>每一帧，都为传播服务</h1>
          <p>用叙事、角色与视觉风格，让内容拥有被看见和被记住的理由。</p>
        </header>

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
      </div>
    </main>
  );
}
