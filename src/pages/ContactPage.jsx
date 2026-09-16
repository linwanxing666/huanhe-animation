const contactQrSrc = `${import.meta.env.BASE_URL}contact/business-qr.jpg`;

export function ContactPage() {
  return (
    <main className="route-page route-contact">
      <div className="route-shell contact-shell">
        <header className="route-intro">
          <p className="route-kicker"><span aria-hidden="true" />联系合作</p>
          <h1>开启下一次创作</h1>
          <p>把目标、题材和时间告诉我们，剩下的交给创意与制作。</p>
        </header>

        <section className="contact-panel" aria-label="合作联系信息">
          <div className="qr-card">
            <div className="qr-frame">
              <img
                className="contact-qr"
                src={contactQrSrc}
                alt="幻核动漫商务联系二维码"
              />
            </div>
          </div>

          <div className="contact-copy">
            <span className="contact-number" aria-hidden="true">合作准备</span>
            <h2>让沟通从清晰开始</h2>
            <p>简单准备以下信息，我们就能更快判断制作方向与推进节奏。</p>
            <ul aria-label="合作前请准备">
              <li><span>一</span><strong>项目类型</strong><small>短剧或广告内容</small></li>
              <li><span>二</span><strong>期望时长</strong><small>单集与整体规模</small></li>
              <li><span>三</span><strong>交付时间</strong><small>预计上线或投放节点</small></li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
