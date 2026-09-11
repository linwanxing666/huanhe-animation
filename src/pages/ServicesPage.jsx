const services = [
  {
    mark: "剧",
    title: "人工智能短剧制作",
    description: "覆盖剧本开发、角色设定、镜头生成、声音设计与后期包装，让创意更快形成完整叙事。",
    tags: ["剧本开发", "角色设定", "镜头生成"],
  },
  {
    mark: "商",
    title: "广告商单制作",
    description: "围绕品牌目标定制内容表达，从创意提案到成片交付，兼顾视觉质感与传播效率。",
    tags: ["创意提案", "品牌视觉", "成片交付"],
  },
];

const process = ["需求沟通", "创意定调", "视觉制作", "成片交付"];

export function ServicesPage() {
  return (
    <main className="route-page route-services">
      <div className="route-shell">
        <header className="route-intro">
          <p className="route-kicker"><span aria-hidden="true" />服务能力</p>
          <h1>从创意到成片</h1>
          <p>以人工智能拓展内容生产边界，以成熟制作流程守住作品质感。</p>
        </header>

        <section className="service-grid" aria-label="核心服务">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="service-card-top">
                <span className="service-mark" aria-hidden="true">{service.mark}</span>
                <span className="service-arrow" aria-hidden="true">↗</span>
              </div>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <div className="service-tags" aria-label={`${service.title}环节`}>
                {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </section>

        <ol className="process-strip" aria-label="合作流程">
          {process.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
